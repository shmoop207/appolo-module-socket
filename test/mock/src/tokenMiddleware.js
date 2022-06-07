"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenMiddleware = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
let TokenMiddleware = class TokenMiddleware {
    run(socket, next) {
        if (socket.handshake.query.token == "1") {
            socket.request.user = 1;
            next();
        }
        else {
            next(new Error("invalid token"));
        }
    }
};
TokenMiddleware = tslib_1.__decorate([
    (0, inject_1.define)()
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map