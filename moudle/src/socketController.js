"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketController = void 0;
class SocketController {
    constructor(_socket, _options) {
        this._socket = _socket;
        this._options = _options;
    }
    async initialize() {
        await this.onInitialized();
        Object.keys(this._options.actions).forEach(action => {
            let eventName = this._options.actions[action];
            this._socket.on(eventName, this[action].bind(this));
        });
        this.socket.once("disconnect", this.onDisconnected.bind(this));
        await this.onConnected();
    }
    async onInitialized() {
    }
    async onDisconnected() {
    }
    async onConnected() {
    }
    get socket() {
        return this._socket;
    }
    get id() {
        return this._socket.id;
    }
    send(event, data) {
        this._socket && this._socket.emit(event, data);
    }
    replySuccess(data) {
        return {
            success: true,
            data: data
        };
    }
    replyError(err) {
        let dto = { success: false };
        if (err) {
            dto.message = err.message;
            dto.code = err.code;
            dto.data = err.data;
        }
        return dto;
    }
}
exports.SocketController = SocketController;
//# sourceMappingURL=socketController.js.map