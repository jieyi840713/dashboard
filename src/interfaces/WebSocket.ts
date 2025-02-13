/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebSocket } from 'ws';

export interface WebSocketMessage {
    type: string;
    payload: any;
}

export interface WebSocketClient {
    id: string;
    socket: WebSocket;
}

export interface ServerToClientEvents {
    noArg: ()=> void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (a:string, cb: (b: number)=> void) => void;
}

export interface ClientToServerEvents {
    hello: ()=> void
}