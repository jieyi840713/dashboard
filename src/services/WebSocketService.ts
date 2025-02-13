/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/WebSocketService.ts
import { WebSocket } from 'ws';
import { WebSocketBase } from '../base/WebSocketBase';
import { Server } from 'http';

interface WSClient extends WebSocket {
    userId?: string;
    isAlive?: boolean;
}

export class WebSocketService extends WebSocketBase {
    private heartbeatInterval!: NodeJS.Timeout;

    constructor(server: Server) {
        super(server);
        this.setupHeartbeat();
    }

    protected handleConnection(ws: WSClient): void {
        ws.userId = Math.random().toString(36).substring(7);
        ws.isAlive = true;
        this.clients.set(ws.userId, ws);

        ws.on('pong', () => {
            ws.isAlive = true;
        });

        // 發送歡迎消息
        this.sendMessage(ws, {
            type: 'welcome',
            userId: ws.userId,
            timestamp: new Date().toISOString()
        });
    }

    protected handleMessage(ws: WSClient, message: any): void {
        // 廣播消息給所有客戶端
        this.broadcast({
            type: 'message',
            userId: ws.userId,
            content: message.content,
            timestamp: new Date().toISOString()
        });
    }

    protected handleClose(ws: WSClient): void {
        if (ws.userId) {
            this.clients.delete(ws.userId);
        }
    }

    private setupHeartbeat(): void {
        this.heartbeatInterval = setInterval(() => {
            this.wss.clients.forEach((ws: WSClient) => {
                if (ws.isAlive === false) {
                    return ws.terminate();
                }
                ws.isAlive = false;
                ws.ping();
            });
        }, 30000);

        this.wss.on('close', () => {
            clearInterval(this.heartbeatInterval);
        });
    }

    private sendMessage(ws: WebSocket, message: any): void {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(message));
        }
    }

    private broadcast(message: any): void {
        this.clients.forEach((client) => {
            this.sendMessage(client, message);
        });
    }

    public override close(): void {
        clearInterval(this.heartbeatInterval);
        super.close();
    }
}