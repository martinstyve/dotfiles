"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const path = require("path");
const Mocha = require("mocha");
const glob_1 = require("glob");
async function run() {
    // Create the mocha test
    const mocha = new Mocha({
        ui: "tdd",
        color: true,
    });
    const testsRoot = path.resolve(__dirname, "..");
    const files = await (0, glob_1.glob)("**/**.test.js", { cwd: testsRoot });
    files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));
    try {
        // Run the mocha test
        mocha.run((failures) => {
            if (failures > 0) {
                throw new Error(`${failures} tests failed.`);
            }
        });
    }
    catch (err) {
        console.error(err);
        throw err;
    }
}
exports.run = run;
//# sourceMappingURL=index.js.map