"use strict";
import * as socketIo from "socket.io";
import {ControllerOptions} from "./interfaces";
import * as _ from "lodash";

export abstract class SocketController {

    protected constructor(private _socket: socketIo.Socket, private _options: ControllerOptions) {

    }

    public initialize() {
        _.forEach(this._options.actions, (eventName, action) =>
            this._socket.on(eventName, this[action].bind(this)));

        this.socket.once("disconnect", this.onDisconnected.bind(this));

        this.onInitialized();
        this.onConnected();
    }

    protected onInitialized() {

    }

    protected onDisconnected() {

    }

    protected onConnected() {

    }

    public get socket(): socketIo.Socket {
        return this._socket;
    }

    public get id() {
        return this._socket.id;
    }

    public send(event: string, data: any) {
        this._socket && this._socket.emit(event, data);
    }


    public replySuccess(data?: any) {
        return {
            success: true,
            data: data
        };
    }

    public replyError(err?: any) {

        let dto: any = {success: false};

        if (err) {
            dto.message = err.message;
            dto.code = err.code;
            dto.data = err.data;
        }

        return dto
    }
}