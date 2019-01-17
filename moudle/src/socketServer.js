"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const socketIo = require("socket.io");
const redis = require("redis");
const socketIoRedis = require("socket.io-redis");
const _ = require("lodash");
let SocketServer = class SocketServer {
    async get() {
        let io = socketIo(this.app.parent.server, _.defaults({}, this.moduleOptions.socket || {}, { "transports": ["websocket"] }));
        if (this.moduleOptions.redis) {
            let pub = redis.createClient(this.moduleOptions.redis);
            let sub = redis.createClient(this.moduleOptions.redis, { return_buffers: true });
            io.adapter(socketIoRedis({ pubClient: pub, subClient: sub }));
        }
        return io;
    }
};
tslib_1.__decorate([
    appolo_1.inject()
], SocketServer.prototype, "injector", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], SocketServer.prototype, "app", void 0);
tslib_1.__decorate([
    appolo_1.inject()
], SocketServer.prototype, "moduleOptions", void 0);
SocketServer = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    appolo_1.factory()
], SocketServer);
exports.SocketServer = SocketServer;
//# sourceMappingURL=socketServer.js.map