"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
class SocketController {
    constructor(_socket, _options) {
        this._socket = _socket;
        this._options = _options;
    }
    initialize() {
        _.forEach(this._options.actions, (eventName, action) => this._socket.on(eventName, this[action].bind(this)));
        this.socket.once("disconnect", this.onDisconnected.bind(this));
        this.onInitialized();
        this.onConnected();
    }
    onInitialized() {
    }
    onDisconnected() {
    }
    onConnected() {
    }
    get socket() {
        return this._socket;
    }
    get id() {
        return this._id;
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