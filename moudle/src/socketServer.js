"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const utils_1 = require("@appolo/utils");
const socket_io_1 = require("socket.io");
const redis_adapter_1 = require("@socket.io/redis-adapter");
const Redis = require("ioredis");
let SocketServer = class SocketServer {
    async get() {
        let io = new socket_io_1.Server(this.app.tree.root.route.server, utils_1.Objects.defaults({}, this.moduleOptions.socket || {}, { "transports": ['polling', 'websocket'] }));
        if (this.moduleOptions.redis) {
            let pubClient = new Redis(this.moduleOptions.redis);
            let subClient = pubClient.duplicate();
            io.adapter((0, redis_adapter_1.createAdapter)(pubClient, subClient));
        }
        return io;
    }
};
(0, tslib_1.__decorate)([
    (0, inject_1.inject)()
], SocketServer.prototype, "injector", void 0);
(0, tslib_1.__decorate)([
    (0, inject_1.inject)()
], SocketServer.prototype, "app", void 0);
(0, tslib_1.__decorate)([
    (0, inject_1.inject)()
], SocketServer.prototype, "moduleOptions", void 0);
SocketServer = (0, tslib_1.__decorate)([
    (0, inject_1.define)(),
    (0, inject_1.singleton)(),
    (0, inject_1.factory)()
], SocketServer);
exports.SocketServer = SocketServer;
//# sourceMappingURL=socketServer.js.map