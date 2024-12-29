"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPositronPreferredRuntime = exports.getExtensionHostPreview = void 0;
const vscode = require("vscode");
function getExtensionHostPreview() {
    const pst = getPositronAPI();
    if (!pst) {
        return;
    }
    return (url) => pst.window.previewUrl(vscode.Uri.parse(url));
}
exports.getExtensionHostPreview = getExtensionHostPreview;
async function getPositronPreferredRuntime(languageId) {
    const pst = getPositronAPI();
    if (!pst) {
        return;
    }
    return await pst.runtime.getPreferredRuntime(languageId);
}
exports.getPositronPreferredRuntime = getPositronPreferredRuntime;
function getPositronAPI() {
    if (typeof globalThis?.acquirePositronApi !== "function") {
        return;
    }
    return globalThis.acquirePositronApi();
}
//# sourceMappingURL=extensionHost.js.map