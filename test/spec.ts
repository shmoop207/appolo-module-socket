import {App, createApp} from 'appolo'
import {SocketModule, SocketProvider} from "../";
import * as io from 'socket.io-client';
import chai = require('chai');
import chaiHttp = require('chai-http');
import Socket = SocketIOClient.Socket;

chai.use(chaiHttp);

let should = require('chai').should();
//chai.use(sinonChai);


describe("socket module Spec", function () {

    let app: App, socket: Socket;

    beforeEach(async () => {
        app = createApp({root: __dirname + "/mock", environment: "production", port: 8182});

        await app.module(new SocketModule({socket:{transports: ['polling','websocket']}}));


        await app.launch();

    });

    afterEach(async () => {
        await app.reset();
    });

    it("should load socket", async () => {

        socket = io('http://localhost:8182', {transports: ['polling','websocket'],transportOptions: {
                polling: {
                    extraHeaders: {
                        'x-clientid': 'abc'
                    }
                }
            }});

        await new Promise((resolve, reject) => {
            socket.on('connect', resolve);

            socket.on('connect_error', reject);
        });


        let data: any = await new Promise(resolve => {
            socket.emit("test2", "ping", resolve)
        });

        data.name.should.be.eq("ping");
        data.action.should.be.eq("test");

        socket.disconnect();


    });

    it("should load socket with namespace", async () => {

        socket = io('http://localhost:8182/foo', {transports: ['websocket'], forceNew: true});

        let data: any = await new Promise(resolve => {
            socket.emit("foo", "ping", resolve)
        });

        data.name.should.be.eq("ping");
        data.action.should.be.eq("NamespaceTestController");

        socket.disconnect();

    });

    it("should load socket with middleware", async () => {

        socket = io('http://localhost:8182/middleware', {transports: ['websocket'], forceNew: true, query: {token: 1}});

        let data: any = await new Promise(resolve => {
            socket.emit("middle", "ping", resolve)
        });

        data.name.should.be.eq("ping");
        data.action.should.be.eq("MiddlewareTestController");
        data.user.should.be.eq(1);

        socket.disconnect();

    })

    it("should load socket with middleware invalid", async () => {

        socket = io('http://localhost:8182/middleware', {transports: ['websocket'], forceNew: true, query: {token: 2}});

        let err = await new Promise((resolve, reject) => {
            socket.on("error", resolve)
        })

        err.should.be.eq("invalid token");

        socket.disconnect();

    })

    it("should have 2 sockets", async () => {

        let socket1 = io('http://localhost:8182/middleware', {
            transports: ['websocket'],
            forceNew: true,
            query: {token: 1}
        });

        let socket2 = io('http://localhost:8182/foo', {transports: ['websocket'], forceNew: true, query: {token: 2}});

        let [data1, data2] = await Promise.all<any, any>([new Promise(resolve => {
            socket1.emit("middle", "ping", resolve)
        }), new Promise(resolve => {
            socket2.emit("foo", "ping", resolve)
        })]);


        data2.name.should.be.eq("ping");
        data2.action.should.be.eq("NamespaceTestController");

        data1.name.should.be.eq("ping");
        data1.action.should.be.eq("MiddlewareTestController");
        data1.user.should.be.eq(1);

        socket1.disconnect();
        socket2.disconnect();

    })

    it("should have socket provider", async () => {

        let socket1 = io('http://localhost:8182/middleware', {
            transports: ['websocket'],
            forceNew: true,
            query: {token: 1}
        });

        await new Promise(resolve => socket1.on("connect", resolve));


        let socketProvider = app.injector.get<SocketProvider>(SocketProvider);


        socketProvider.clients.size.should.eq(2);

        setTimeout(() => socketProvider.sendToAll("test", "working"));

        let result = await new Promise(resolve => socket1.once("test", resolve));

        result.should.be.eq("working");

        setTimeout(() => socketProvider.sendToNamespace("/middleware", "test", "working2"));

        let result2 = await new Promise(resolve => socket1.once("test", resolve));

        result2.should.be.eq("working2");


        socket1.disconnect();

    })

});


