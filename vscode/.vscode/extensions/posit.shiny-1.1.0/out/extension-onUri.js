"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePositShinyUri = void 0;
const vscode = require("vscode");
const url_1 = require("url");
const shinylive_1 = require("./shinylive");
async function handlePositShinyUri(uri) {
    if (!["/shinylive", "/shinylive/"].includes(uri.path)) {
        console.warn(`[shiny] Unexpected URI: ${uri.toString()}`);
        return;
    }
    const encodedUrl = new url_1.URLSearchParams(uri.query).get("url");
    if (!encodedUrl) {
        vscode.window.showErrorMessage("No URL provided in the Open from Shinylive link.");
        return;
    }
    const url = decodeURIComponent(encodedUrl);
    const bundle = (0, shinylive_1.shinyliveUrlDecode)(url);
    if (!bundle) {
        vscode.window.showErrorMessage("Shinylive: Failed to parse the Shinylive link. " +
            "Please check the link and try again.");
        return;
    }
    let filesText = bundle.files
        .slice(0, 3)
        .map((f) => f.name)
        .join(", ");
    if (bundle.files.length > 3) {
        filesText += `, and ${bundle.files.length - 3} more files`;
    }
    const reviewAction = await vscode.window.showWarningMessage(`You are about to save a Shinylive app with ${filesText} to your workspace. Would you like to...`, { modal: true }, { title: "Review the app on shinylive.io", action: "review" }, {
        title: `Save app ${bundle.files.length === 1 ? "file" : "files"} locally`,
        action: "save",
    });
    let { action } = reviewAction || { action: "cancel" };
    if (action === "cancel") {
        return;
    }
    if (action === "review") {
        bundle.mode = "editor";
        const editorUrl = (0, shinylive_1.shinyliveUrlEncode)(bundle);
        vscode.env.openExternal(vscode.Uri.parse(editorUrl));
        const openAfterReview = await vscode.window.showInformationMessage("After reviewing the Shinylive app, would you like to save it?", { modal: true }, "Yes");
        if (!openAfterReview) {
            return;
        }
        action = "save";
    }
    if (action === "save") {
        await (0, shinylive_1.shinyliveSaveAppFromUrl)(url);
        return;
    }
}
exports.handlePositShinyUri = handlePositShinyUri;
//# sourceMappingURL=extension-onUri.js.map