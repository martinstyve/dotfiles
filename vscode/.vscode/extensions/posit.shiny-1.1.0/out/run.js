"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDidStartDebugSession = exports.rRunApp = exports.pyDebugApp = exports.pyRunApp = void 0;
const python_extension_1 = require("@vscode/python-extension");
const vscode = require("vscode");
const path_1 = require("path");
const fs = require("fs");
const extension_1 = require("./extension");
const net_utils_1 = require("./net-utils");
const shell_utils_1 = require("./shell-utils");
const port_settings_1 = require("./port-settings");
const winreg = require("winreg");
const extensionHost_1 = require("./extension-api-utils/extensionHost");
const DEBUG_NAME = "Debug Shiny app";
/* Shiny for Python --------------------------------------------------------- */
async function pyRunApp() {
    const path = getActiveEditorFile();
    if (!path) {
        return;
    }
    if (!(await checkForPythonExtension())) {
        return;
    }
    await saveActiveEditorFile();
    const python = await getSelectedPythonInterpreter();
    if (!python) {
        return;
    }
    const port = await (0, port_settings_1.getAppPort)("run", "python");
    const autoreloadPort = await (0, port_settings_1.getAutoreloadPort)("run");
    const terminal = await createTerminalAndCloseOthersWithSameName({
        name: "Shiny",
        env: {
            // We store the Python path here so we know whether the terminal can be
            // reused by us in the future (yes if the selected Python interpreter has
            // changed, no if it has). Currently we don't ever reuse terminals,
            // instead we always close the old ones--but this could change in the
            // future.
            // eslint-disable-next-line @typescript-eslint/naming-convention
            PYSHINY_EXEC_CMD: python,
            // We save this here so escapeCommandForTerminal knows what shell
            // semantics to use when escaping arguments. A bit magical, but oh well.
            ...(0, shell_utils_1.envVarsForShell)(),
        },
    });
    const args = ["-m", "shiny", "run"];
    args.push("--port", port + "");
    args.push("--reload");
    args.push("--autoreload-port", autoreloadPort + "");
    args.push(path);
    const cmdline = (0, shell_utils_1.escapeCommandForTerminal)(terminal, python, args);
    terminal.sendText(cmdline);
    // Clear out the browser. Without this it can be a little confusing as to
    // whether the app is trying to load or not.
    (0, net_utils_1.openBrowser)("about:blank");
    // If we start too quickly, openBrowserWhenReady may detect the old Shiny
    // process (in the process of shutting down), not the new one. Give it a
    // second. It's a shame to wait an extra second, but it's only when the Play
    // button is hit, not on autoreload.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (process.env["CODESPACES"] === "true") {
        // Codespaces has a port forwarding system that has an interesting auth
        // system. By default, forwarded ports are private, and each forwarded port
        // is served at a different hostname. Authentication is handled in one of
        // two ways: 1) in a browser, you would attempt to navigate to a page and it
        // would send you through an authentication flow, resulting in cookies being
        // set; or 2) for an API call, you can add a custom header with a GitHub
        // token. Our autoreload WebSocket client wants to connect, but it can't add
        // custom headers (the browser WebSocket client intentionally doesn't
        // support it). So we need to navigate the browser to the autoreload port to
        // get the cookies set. Fortunately, Shiny's autoreload port does nothing
        // but redirect you to the main port.
        //
        // So that's what we do on Cloudspaces: send the browser to the autoreload
        // port instead of the main port.
        await (0, net_utils_1.openBrowserWhenReady)(autoreloadPort, [port], terminal);
    }
    else {
        // For non-Cloudspace environments, simply go to the main port.
        await (0, net_utils_1.openBrowserWhenReady)(port, [autoreloadPort], terminal);
    }
}
exports.pyRunApp = pyRunApp;
async function pyDebugApp() {
    if (vscode.debug.activeDebugSession?.name === DEBUG_NAME) {
        await vscode.debug.stopDebugging(vscode.debug.activeDebugSession);
    }
    const path = getActiveEditorFile();
    if (!path) {
        return;
    }
    if (!(await checkForPythonExtension())) {
        return;
    }
    await saveActiveEditorFile();
    const python = await getSelectedPythonInterpreter();
    if (!python) {
        return;
    }
    const port = await (0, port_settings_1.getAppPort)("debug", "python");
    const justMyCode = vscode.workspace
        .getConfiguration("shiny.python")
        .get("debugJustMyCode", true);
    await vscode.debug.startDebugging(undefined, {
        type: "python",
        name: DEBUG_NAME,
        request: "launch",
        module: "shiny",
        args: ["run", "--port", port.toString(), path],
        jinja: true,
        justMyCode,
        stopOnEntry: false,
    });
    // Don't spawn browser. We do so in onDidStartDebugSession instead, so when
    // VSCode restarts the debugger instead of us, the SimpleBrowser is still
    // opened.
}
exports.pyDebugApp = pyDebugApp;
/* Shiny for R --------------------------------------------------------- */
async function rRunApp() {
    const pathFile = getActiveEditorFile();
    if (!pathFile) {
        return;
    }
    await saveActiveEditorFile();
    const path = (0, extension_1.isShinyAppRPart)(pathFile) ? (0, path_1.dirname)(pathFile) : pathFile;
    const port = await (0, port_settings_1.getAppPort)("run", "r");
    // TODO: Is this needed for Shiny for R too?
    // const autoreloadPort = await getAutoreloadPort("run");
    const terminal = await createTerminalAndCloseOthersWithSameName({
        name: "Shiny",
        env: {
            // We save this here so escapeCommandForTerminal knows what shell
            // semantics to use when escaping arguments. A bit magical, but oh well.
            ...(0, shell_utils_1.envVarsForShell)(),
        },
    });
    const useDevmode = vscode.workspace
        .getConfiguration("shiny.r")
        .get("devmode");
    const extensionRoot = getExtensionPath();
    if (!extensionRoot) {
        return;
    }
    const scriptPath = (0, path_1.join)(extensionRoot, "rscripts", "runShinyApp.R");
    const args = [scriptPath, path, port + "", useDevmode ? "--devmode" : ""];
    const rscriptBinPath = await getRBinPath("Rscript");
    if (!rscriptBinPath) {
        vscode.window.showErrorMessage("Could not find R. Is R installed on your system?" +
            "If R is installed, please make sure your PATH " +
            "environment variable is configured correctly.");
        return;
    }
    const cmdline = (0, shell_utils_1.escapeCommandForTerminal)(terminal, rscriptBinPath, args);
    terminal.sendText(cmdline);
    // Clear out the browser. Without this it can be a little confusing as to
    // whether the app is trying to load or not.
    (0, net_utils_1.openBrowser)("about:blank");
    // If we start too quickly, openBrowserWhenReady may detect the old Shiny
    // process (in the process of shutting down), not the new one. Give it a
    // second. It's a shame to wait an extra second, but it's only when the Play
    // button is hit, not on autoreload.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // if (process.env["CODESPACES"] === "true") {
    // TODO: Support Codespaces
    await (0, net_utils_1.openBrowserWhenReady)(port, [], terminal);
}
exports.rRunApp = rRunApp;
/* Utilities --------------------------------------------------------- */
function onDidStartDebugSession(e) {
    // When a debug session starts, check if it's a Shiny session and whether we
    // can figure out the port number. If so, open a browser.
    const { type, name } = e.configuration;
    const args = e.configuration.args;
    // It's not a Shiny session
    if (type !== "python" || name !== DEBUG_NAME) {
        return;
    }
    // No arguments are present
    if (!args) {
        return;
    }
    const idxPortFlag = args.indexOf("--port");
    // No --port flag is present, or it's the last argument
    if (idxPortFlag < 0 || idxPortFlag === args.length - 1) {
        return;
    }
    const portStr = args[idxPortFlag + 1];
    // Port number is not a number
    if (!/^\d+$/.test(portStr)) {
        return;
    }
    const port = parseInt(portStr);
    // Port might be 0 which means random assignment--we don't ever set the port
    // to 0 in our code but I guess it's theoretically possible that a user could.
    if (port <= 0) {
        return;
    }
    // Finally have a valid port number! Open a browser.
    (0, net_utils_1.openBrowserWhenReady)(port).catch((err) => {
        console.warn("Failed to open browser", err);
    });
}
exports.onDidStartDebugSession = onDidStartDebugSession;
async function createTerminalAndCloseOthersWithSameName(options) {
    if (!options.name) {
        throw new Error("Terminal name is required");
    }
    // Grab a list of all terminals with the same name, before we create the new
    // one. We'll close them. (It'd be surprising if there was more than one,
    // given that we always close the previous ones when starting a new one.)
    const oldTerminals = vscode.window.terminals.filter((term) => term.name === options.name);
    const newTerm = vscode.window.createTerminal(options);
    newTerm.show(true);
    // Wait until new terminal is showing before disposing the old ones.
    // Otherwise we get a flicker of some other terminal in the in-between time.
    const closingTerminals = oldTerminals.map((x) => {
        const p = new Promise((resolve) => {
            // Resolve when the terminal is closed. We're working hard to be accurate
            // BUT empirically it doesn't seem like the old Shiny processes are
            // actually terminated at the time this promise is resolved, so callers
            // shouldn't assume that.
            const subscription = vscode.window.onDidCloseTerminal(function sub(term) {
                if (term === x) {
                    subscription.dispose();
                    resolve();
                }
            });
        });
        x.dispose();
        return p;
    });
    await Promise.allSettled(closingTerminals);
    return newTerm;
}
async function checkForPythonExtension() {
    if (vscode.extensions.getExtension("ms-python.python")) {
        return true;
    }
    const response = await vscode.window.showErrorMessage("The Python extension is required to run Shiny apps. " +
        "Please install it and try again.", "Show Python extension", "Not now");
    if (response === "Show Python extension") {
        vscode.commands.executeCommand("extension.open", "ms-python.python");
    }
    return false;
}
/**
 * Gets the currently selected Python interpreter, according to the Python extension.
 * @returns A path, or false if no interpreter is selected.
 */
async function getSelectedPythonInterpreter() {
    // Gather details of the current Python interpreter. We want to make sure
    // only to re-use a terminal if it's using the same interpreter.
    const pythonAPI = await python_extension_1.PythonExtension.api();
    // The getActiveEnvironmentPath docstring says: "Note that this can be an
    // invalid environment, use resolveEnvironment to get full details."
    const unresolvedEnv = pythonAPI.environments.getActiveEnvironmentPath(vscode.window.activeTextEditor?.document.uri);
    const resolvedEnv = await pythonAPI.environments.resolveEnvironment(unresolvedEnv);
    if (!resolvedEnv) {
        vscode.window.showErrorMessage("Unable to find Python interpreter. " +
            'Please use the "Python: Select Interpreter" command, and try again.');
        return false;
    }
    return resolvedEnv.path;
}
function getActiveEditorFile() {
    const appPath = vscode.window.activeTextEditor?.document.uri.fsPath;
    if (typeof appPath !== "string") {
        vscode.window.showErrorMessage("No active file");
        return;
    }
    return appPath;
}
async function saveActiveEditorFile() {
    if (vscode.window.activeTextEditor?.document.isDirty) {
        await vscode.window.activeTextEditor?.document.save();
    }
}
function getExtensionPath() {
    const extensionPath = vscode.extensions.getExtension("Posit.shiny")?.extensionPath;
    if (!extensionPath) {
        vscode.window.showErrorMessage("Cannot run Shiny app: failed to locate extension directory");
        return;
    }
    return extensionPath;
}
async function getRBinPath(bin) {
    return ((await getRPathFromPositron(bin)) ||
        getRPathFromConfig(bin) ||
        getRPathFromEnv(bin) ||
        (await getRPathFromWindowsReg(bin)) ||
        "");
}
async function getRPathFromPositron(bin) {
    const runtimeMetadata = await (0, extensionHost_1.getPositronPreferredRuntime)("r");
    if (!runtimeMetadata) {
        return "";
    }
    console.log(`[shiny] runtimeMetadata: ${JSON.stringify(runtimeMetadata)}`);
    const runtimePath = runtimeMetadata.runtimePath;
    if (!runtimePath) {
        return "";
    }
    const { platform } = process;
    const fileExt = platform === "win32" ? ".exe" : "";
    return (0, path_1.join)((0, path_1.dirname)(runtimePath), bin + fileExt);
}
function getRPathFromConfig(bin) {
    const { platform } = process;
    const fileExt = platform === "win32" ? ".exe" : "";
    let osType;
    switch (platform) {
        case "win32":
            osType = "windows";
            break;
        case "darwin":
            osType = "mac";
            break;
        default:
            osType = "linux";
    }
    const rPath = vscode.workspace
        .getConfiguration("r.rpath")
        .get(osType, undefined);
    console.log(`[shiny] rPath: ${rPath}`);
    return rPath ? (0, path_1.join)((0, path_1.dirname)(rPath), bin + fileExt) : "";
}
function getRPathFromEnv(bin = "R") {
    const { platform } = process;
    const splitChr = platform === "win32" ? ";" : ":";
    const fileExt = platform === "win32" ? ".exe" : "";
    if (!process.env.PATH) {
        return "";
    }
    for (const envPath of process.env.PATH.split(splitChr)) {
        const rBinPath = (0, path_1.join)(envPath, bin + fileExt);
        if (fs.existsSync(rBinPath)) {
            return rBinPath;
        }
    }
    return "";
}
async function getRPathFromWindowsReg(bin = "R") {
    if (process.platform !== "win32") {
        return "";
    }
    let rPath = "";
    try {
        const key = new winreg({
            hive: winreg.HKLM,
            key: "\\Software\\R-Core\\R",
        });
        const item = await new Promise((c, e) => key.get("InstallPath", (err, result) => err === null ? c(result) : e(err)));
        rPath = (0, path_1.join)(item.value, "bin", bin + ".exe");
        rPath = fs.existsSync(rPath) ? rPath : "";
    }
    catch (e) {
        rPath = "";
    }
    return rPath;
}
//# sourceMappingURL=run.js.map