"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamespaceTestController = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
let NamespaceTestController = class NamespaceTestController extends index_1.SocketController {
    test(name) {
        return { name, action: "NamespaceTestController" };
    }
};
tslib_1.__decorate([
    (0, index_1.action)("foo")
], NamespaceTestController.prototype, "test", null);
NamespaceTestController = tslib_1.__decorate([
    (0, index_1.socket)("/foo")
], NamespaceTestController);
exports.NamespaceTestController = NamespaceTestController;
//# sourceMappingURL=namespaceTestController.js.map