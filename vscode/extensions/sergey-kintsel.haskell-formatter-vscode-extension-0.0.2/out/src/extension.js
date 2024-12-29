"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var proc = require("child_process");
var haskellLangId = 'haskell';
function activate(context) {
    vscode.languages.registerDocumentRangeFormattingEditProvider(haskellLangId, {
        provideDocumentRangeFormattingEdits: function (document, range, options, token) {
            var showErrorMessage = function (friendlyText, error) {
                vscode.window.showErrorMessage(friendlyText + "\n" + error.stderr.toString());
                return [];
            };
            try {
                proc.execSync('hindent --help');
            }
            catch (e) {
                return showErrorMessage("HIndent is not installed", e);
            }
            try {
                proc.execSync('stylish-haskell --help');
            }
            catch (e) {
                return showErrorMessage("stylish-haskell is not installed", e);
            }
            var text = document.getText(range);
            var hindentedText;
            try {
                hindentedText = proc.execSync('hindent', { input: text }).toString();
            }
            catch (e) {
                return showErrorMessage('hindent failed to format the code', e);
            }
            var styledText;
            try {
                styledText = proc.execSync('stylish-haskell', { input: hindentedText }).toString();
            }
            catch (e) {
                return showErrorMessage('stylish-haskell failed to format the code', e);
            }
            return [vscode.TextEdit.replace(range, styledText)];
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map