"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
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
    index_1.define()
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;
//# sourceMappingURL=tokenMiddleware.js.map