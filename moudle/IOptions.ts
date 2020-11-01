import socketIo = require('socket.io');


export interface IOptions {
    id?: string,
    redis?: string,
    auto?: boolean,
    socket?: socketIo.ServerOptions

}
