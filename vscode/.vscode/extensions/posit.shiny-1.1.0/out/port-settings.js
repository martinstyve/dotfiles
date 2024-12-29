"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAutoreloadPort = exports.getAppPort = void 0;
const vscode = require("vscode");
const net_utils_1 = require("./net-utils");
const transientPorts = {};
async function getAppPort(reason, language = "python") {
    return (
    // Port can be zero, which means random assignment
    vscode.workspace.getConfiguration(`shiny.${language}`).get("port") ||
        (await defaultPort(`app_${reason}`)));
}
exports.getAppPort = getAppPort;
async function getAutoreloadPort(reason) {
    return (
    // Port can be zero, which means random assignment
    vscode.workspace.getConfiguration("shiny.python").get("autoreloadPort") ||
        (await defaultPort(`autoreload_${reason}`)));
}
exports.getAutoreloadPort = getAutoreloadPort;
async function defaultPort(portCacheKey) {
    // Retrieve most recently used port
    let port = transientPorts[portCacheKey] ?? 0;
    if (port !== 0) {
        return port;
    }
    port = await (0, net_utils_1.suggestPort)();
    // Save for next time
    transientPorts[portCacheKey] = port;
    return port;
}
//# sourceMappingURL=port-settings.js.map