/* eslint-disable @typescript-eslint/no-explicit-any */
// src/base/WebSocketBase.ts
import { WebSocket, WebSocketServer } from 'ws';
import { Server } from 'http';

export abstract class WebSocketBase {
    protected wss: WebSocketServer;
    protected clients: Map<string, WebSocket>;

    constructor(server: Server) {
        this.wss = new WebSocketServer({ server });
        this.clients = new Map();
        this.initialize();
    }

    protected abstract handleMessage(ws: WebSocket, message: any): void;
    protected abstract handleConnection(ws: WebSocket): void;
    protected abstract handleClose(ws: WebSocket): void;

    private initialize(): void {
        this.wss.on('connection', (ws: WebSocket) => {
            this.handleConnection(ws);

            ws.on('message', (message: string) => {
                try {
                    const parsedMessage = JSON.parse(message.toString());
                    this.handleMessage(ws, parsedMessage);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });

            ws.on('close', () => {
                this.handleClose(ws);
            });
        });
    }

    public close(): void {
        this.wss.close();
    }
}