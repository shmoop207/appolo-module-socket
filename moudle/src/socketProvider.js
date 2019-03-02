"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("appolo/index");
let SocketProvider = class SocketProvider {
    _init() {
        if (this.moduleOptions.auto) {
            this.initialize();
        }
    }
    initialize() {
        this.socketManager.initialize();
    }
    sendToAll(event, data) {
        for (let namespace of this.socketManager.controllers.keys()) {
            this.sendToNamespace(namespace, event, data);
        }
    }
    sendToRoom(room, event, data) {
        for (let namespace of this.socketManager.controllers.keys()) {
            this.sendToNamespaceRoom(namespace, room, event, data);
        }
    }
    sendToNamespace(namespace, event, data) {
        this.socketServer.of(namespace).emit(event, data);
    }
    sendToNamespaceRoom(namespace, room, event, data) {
        this.socketServer.of(namespace).in(room).emit(event, data);
    }
    get clients() {
        return this.socketManager.clients;
    }
};
tslib_1.__decorate([
    index_1.inject()
], SocketProvider.prototype, "socketServer", void 0);
tslib_1.__decorate([
    index_1.inject()
], SocketProvider.prototype, "socketManager", void 0);
tslib_1.__decorate([
    index_1.inject()
], SocketProvider.prototype, "moduleOptions", void 0);
tslib_1.__decorate([
    index_1.initMethod()
], SocketProvider.prototype, "_init", null);
SocketProvider = tslib_1.__decorate([
    index_1.define(),
    index_1.singleton()
], SocketProvider);
exports.SocketProvider = SocketProvider;
//# sourceMappingURL=socketProvider.js.map