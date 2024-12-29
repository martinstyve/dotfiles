"use strict";
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
// From https://github.com/rstudio/shinyuieditor/blob/392659a0d936e4e38ac99660e89b0327db45b3a9/inst/vscode-extension/src/extension-api-utils/runShellCommand.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.runShellCommand = void 0;
const child_process_1 = require("child_process");
async function runShellCommand({ cmd, args, verbose = false, timeout_ms = 1500, }) {
    const logger = makeLogger(verbose, "runShellCommand: ");
    return new Promise((resolve) => {
        const output = { stdout: [], stderr: [] };
        const spawnedProcess = (0, child_process_1.spawn)(cmd, args);
        function onSpawn() {
            logger("Spawned");
        }
        function onError(e) {
            logger("Error " + e.message);
            cleanup();
            resolve({ status: "error", errorMsgs: e.message, ...output });
        }
        function onClose() {
            logger("Close");
            cleanup();
            resolve({ status: "success", ...output });
        }
        function onStdout(d) {
            logger(`stdout: ${d.toString()}`);
            output.stdout.push(d.toString());
        }
        function onStderr(d) {
            logger(`stderr: ${d.toString()}`);
            output.stderr.push(d.toString());
        }
        function cleanup() {
            clearTimeout(startTimeout);
            spawnedProcess.off("spawn", onSpawn);
            spawnedProcess.off("error", onError);
            spawnedProcess.off("close", onClose);
            spawnedProcess.stdout.off("data", onStdout);
            spawnedProcess.stderr.off("data", onStderr);
        }
        const startTimeout = setTimeout(() => {
            resolve({
                status: "error",
                errorMsgs: `Command, no response from run command within ${timeout_ms}ms:\n${cmd} ${args?.join(" ")}`,
                ...output,
            });
            cleanup();
        }, timeout_ms);
        spawnedProcess.on("spawn", onSpawn);
        spawnedProcess.on("error", onError);
        spawnedProcess.on("close", onClose);
        spawnedProcess.stdout.on("data", onStdout);
        spawnedProcess.stderr.on("data", onStderr);
    });
}
exports.runShellCommand = runShellCommand;
function makeLogger(verbose, prefix) {
    return (msg) => {
        if (verbose) {
            // eslint-disable-next-line no-console
            console.log(prefix + msg);
        }
    };
}
//# sourceMappingURL=runShellCommand.js.map