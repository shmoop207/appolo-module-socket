"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const appolo_1 = require("appolo");
let MultiSocketTestController = class MultiSocketTestController extends index_1.SocketController {
    async onConnected() {
        this.socket.join("roomTest");
    }
    test(name) {
        this.socketProvider.sendToNamespaceRoom("/multi", "roomTest", "test", { working: 1 });
        return { name, action: "MultiSocketTestController" };
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], MultiSocketTestController.prototype, "socketProvider", void 0);
tslib_1.__decorate([
    index_1.action("multi")
], MultiSocketTestController.prototype, "test", null);
MultiSocketTestController = tslib_1.__decorate([
    index_1.socket("/multi")
], MultiSocketTestController);
exports.MultiSocketTestController = MultiSocketTestController;
//# sourceMappingURL=multiSocketTestController.js.map