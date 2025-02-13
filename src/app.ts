import express, { Application } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import {UserRoute} from './routes/UserRoute'
import {ProductRoute} from './routes/ProductRoute'
import {IngredientRoute} from './routes/IngredientRoute'
import {TransactionsRoute} from './routes/TransactionsRoute'
import {ChartOfAccountsRoute} from './routes/ChartOfAccountsRoute'
import {OrderRoute} from './routes/OrderRoute'
import {InventoryRoute} from './routes/InventoryRoute'
import path from 'path';
import {UploadRoute} from './routes/UploadRoute'
import { WebSocketService } from './services/WebSocketService';

class App {
    public app: Application;
    private server: HTTPServer;
    private wsService!: WebSocketService;

    constructor () {
        this.app = express()
        this.server = createServer(this.app);

        this.initializeMiddlewares()
        this.initializeRoutes()
        this.initializeWebSocket();
        this.initializeErrorHandling()
    }

    private initializeMiddlewares(){
        this.app.use(cors({
            origin: '*',  // 允許所有來源
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],  // 允許的 HTTP 方法
            allowedHeaders: ['Content-Type', 'Authorization']  // 允許的請求標頭
        }))
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    }

    private initializeRoutes(){
        this.app.use('/api/users', new UserRoute().getRouter())
        this.app.use('/api/product', new ProductRoute().getRouter())
        this.app.use('/api/chartOfAccount',  new ChartOfAccountsRoute().getRouter())
        this.app.use('/api/ingredient', authMiddleware, new IngredientRoute().getRouter())
        this.app.use('/api/transaction', authMiddleware, new TransactionsRoute().getRouter())
        this.app.use('/api/order', new OrderRoute().getRouter())
        this.app.use('/api/inventory', new InventoryRoute().getRouter())
        this.app.use('/api/upload', new UploadRoute().getRouter())
    }

    private initializeErrorHandling(){
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }

    private initializeWebSocket() {
        this.wsService = new WebSocketService(this.server);
    }

    public listen(port: number): void {
        this.server.listen(port, () => {
            console.log(`🚀 Server is running on http://localhost:${port}`);
        });
    }

}

const port = 3000;
const application = new App();
application.listen(port);

export default application.app;