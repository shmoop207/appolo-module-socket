import {ServerOptions}  from 'socket.io';


export interface IOptions {
    id?: string,
    redis?: string,
    auto?: boolean,
    socket?: Partial<ServerOptions>

}
