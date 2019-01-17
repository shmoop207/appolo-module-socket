"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../index");
const tokenMiddleware_1 = require("./tokenMiddleware");
let MiddlewareTestController = class MiddlewareTestController extends index_1.SocketController {
    onConnected() {
        this.user = this.socket.request.user;
    }
    test(name) {
        return { name, action: "MiddlewareTestController", user: this.user };
    }
};
tslib_1.__decorate([
    index_1.action("middle")
], MiddlewareTestController.prototype, "test", null);
MiddlewareTestController = tslib_1.__decorate([
    index_1.socket("/middleware"),
    index_1.middleware(tokenMiddleware_1.TokenMiddleware)
], MiddlewareTestController);
exports.MiddlewareTestController = MiddlewareTestController;
//# sourceMappingURL=middlewareTestController.js.map