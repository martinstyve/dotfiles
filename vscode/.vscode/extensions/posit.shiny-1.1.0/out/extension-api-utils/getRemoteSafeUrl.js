"use strict";
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/naming-convention */
// From https://github.com/rstudio/shinyuieditor/blob/392659a0d936e4e38ac99660e89b0327db45b3a9/inst/vscode-extension/src/extension-api-utils/getRemoteSafeUrl.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRemoteSafeUrl = void 0;
const fs = require("fs");
const vscode = require("vscode");
const runShellCommand_1 = require("./runShellCommand");
/**
 * Get a safe for hosted versions of vscode url for local server running on a
 * given port
 * @param local_port Port number of a locally running server
 * @returns Full url to access the proxied local server.
 */
async function getRemoteSafeUrl(local_port) {
    if (getInPositWorkbench()) {
        return await getForwardedWorkbenchUrl(local_port);
    }
    const local_uri = vscode.Uri.parse(`http://localhost:${local_port}`);
    return (await vscode.env.asExternalUri(local_uri)).toString();
}
exports.getRemoteSafeUrl = getRemoteSafeUrl;
// Path to a binary that exists on workbench that will tell us where a given port is forwarded.
const WORKBENCH_URL_FORWARDING_BINARY = "/usr/lib/rstudio-server/bin/rserver-url";
/**
 * Check to see if the vscode instance the extension is running in is hosted on
 * Posit workbench
 * @returns Boolean declaring if we're in Posit workbench based on environment
 * variables and port forwarding binary existance
 */
function getInPositWorkbench() {
    const env_variables_exist = "RS_SERVER_URL" in process.env;
    if (!env_variables_exist)
        return false;
    const forwarding_binary_exists = fs.existsSync(WORKBENCH_URL_FORWARDING_BINARY);
    // We appear to be in workbench but can't find the port forwarding binary.
    // This is probably bad news but we let the built in forwarding attempt
    // its best.
    return forwarding_binary_exists;
}
/**
 * Get a full URL for a workbench proxied local server
 * @param local_port Port number of a locally running server
 * @returns Full url of remote accessable endpoint for local server
 */
async function getForwardedWorkbenchUrl(local_port) {
    const port_forward_cmd_output = await (0, runShellCommand_1.runShellCommand)({
        cmd: WORKBENCH_URL_FORWARDING_BINARY,
        args: [String(local_port)],
    });
    if (port_forward_cmd_output.status === "error") {
        Error("Failed to get Posit workbench forwarded port. Error msg:\n" +
            port_forward_cmd_output.errorMsgs);
    }
    const server_url = process.env["RS_SERVER_URL"];
    const session_url = process.env["RS_SESSION_URL"];
    if (!server_url || !session_url) {
        throw new Error("Can't find URL for workbench.");
    }
    const forwarded_port = port_forward_cmd_output.stdout[0];
    return `${server_url}${session_url.slice(1)}p/${forwarded_port}/`;
}
//# sourceMappingURL=getRemoteSafeUrl.js.map