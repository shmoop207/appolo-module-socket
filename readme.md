---
id: socket
title: Socket
sidebar_label: Socket
---
socket module for appolo build with [socket.io](https://socket.io/)

## Installation

```javascript
npm i @appolo/scoket
```

## Options
| key | Description | Type | Default
| --- | --- | --- | --- |
| `id` | `SocketProvider` injection id | `string`|  `socketProvider`|
| `auto` | true to auto initialize socket listen events | `boolean` | `true` |
| `redis` | redis connection for sockets sync   | `string` | `null` |
| `socket` | socket options | `object` | `{"transports": ["websocket"]}` |

in config/modules/all.ts

```javascript
import {ScoketModule} from '@appolo/socket';

export = async function (app: App) {
   await app.module(new ScoketModule({redis:"redis://redis-connection-string"}));
}
```


## SocketController
will be created on socket new connection and holds the socket instance.
must be inherit from `SocketController` and defined using `@socket`.

you can define custom namespace using `@socket("someNamespace")` default to `/`.

you subscribe to socket events using `@action('someEvent')` the return object from the action will be passed to socket callback id exists
promises also supported.

```javascript
import {action, socket, SocketController} from "@appolo/scoket";

@socket()
export class MySocketController extends SocketController {

    @action("someAction")
    public asyc test(name: string) {
        let someData  = await doSomeThingAsync();

        return {arg:name,someData}
    }
}
```
socket client
```javascript
import * as io from 'socket.io-client';

let socket = io("http://localhost:8080")

socket.emit("someAction", "working" ({arg})=>{
    console.log(arg) // working
})

```
### Hooks
- `onInitialized` - called when socket initialized
- `onDisconnected` - called when socket disconnected
- `onConnected` - called when socket connected


```javascript
import {action, socket, SocketController} from "@appolo/scoket";

@socket()
export class MySocketController extends SocketController {

    @action("someAction")
    public test(name: string) {
        return {arg:name}
    }

    onDisconnected(){
        // do something
    }
}
```

### Methods
- `get socket(): socketIo.Socket` - return `socket` instance
- `get id(): string` - return `socket` id
- `send(event: string, data: any)`  - emit socket event

## Middleware
Middleware can be used before socket connect

```javascript
import {IMiddleware} from "@appolo/scoket";

@define()
export class TokenMiddleware implements IMiddleware {

    run(socket: socketIo.Socket, next: NextFn) {
        if (socket.handshake.query.token == "1") {
            socket.request.user = 1;
            next()
        } else {
            next(new Error("invalid token"))
        }
    }
}
```

```javascript
@socket()
@middleware(TokenMiddleware)
export class MySocketController extends SocketController {

    private user:any;
    onConnected(){

        this.user = this.socket.request.user
    }

    @action("test")
    public test() {
        return {user:this.user}
    }
}
```


## SocketProvider
holds all the socket controllers.
can send messages to all sockets and namespaces


```javascript
import {ScoketProvider} from "@appolo/scoket";

@define()
export class SomeManager  {

    @inject() socketProvider:ScoketProvider

    notifyAll(){
        this.socketProvider.sendToAll("someEvent",{some:"data"})
    }
}
```

### Methods
- `sendToAll(event: string, data: any)` - event message to all clients
- `sendToNamespace(namespace: string, event: string, data: any)` - event message to all clients in a namespace
- `get clients(): Map<string, SocketController>` - Map of all sockets by id