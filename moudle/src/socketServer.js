"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const socketIo = require("socket.io");
const socketIoRedis = require("socket.io-redis");
let SocketServer = class SocketServer {
    async get() {
        let io = socketIo(this.app.tree.root.route.server, utils_1.Objects.defaults({}, this.moduleOptions.socket || {}, { "transports": ['polling', 'websocket'] }));
        if (this.moduleOptions.redis) {
            io.adapter(socketIoRedis(this.moduleOptions.redis));
        }
        return io;
    }
};
tslib_1.__decorate([
    inject_1.inject()
], SocketServer.prototype, "injector", void 0);
tslib_1.__decorate([
    inject_1.inject()
], SocketServer.prototype, "app", void 0);
tslib_1.__decorate([
    inject_1.inject()
], SocketServer.prototype, "moduleOptions", void 0);
SocketServer = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton(),
    inject_1.factory()
], SocketServer);
exports.SocketServer = SocketServer;
//# sourceMappingURL=socketServer.js.map