import express, { Application } from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import {UserRoute} from './routes/UserRoute'
import {ProductRoute} from './routes/ProductRoute'

class App {
    public app: Application;

    constructor () {
        this.app = express()
        this.initializeMiddlewares()
        this.initializeRoutes()
        this.initializeErrorHandling()
    }

    private initializeMiddlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private initializeRoutes(){
        this.app.use('/api/users', new UserRoute().getRouter())
        this.app.use('/api/product', new ProductRoute().getRouter())
    }

    private initializeErrorHandling(){
        this.app.use(notFoundHandler);
        this.app.use(errorHandler);
    }
}

const app = new App().app;
const port = 3000

app.listen(port, ()=>{
    console.log(`🚀 Server is running on http://localhost:${port}`);
})

export default app;