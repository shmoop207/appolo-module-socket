"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let testController = class testController extends index_1.SocketController {
    test(name) {
        return { name, action: "test" };
    }
};
tslib_1.__decorate([
    index_1.action("test2")
], testController.prototype, "test", null);
testController = tslib_1.__decorate([
    index_1.socket()
], testController);
exports.testController = testController;
//# sourceMappingURL=testController.js.map