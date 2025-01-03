import { Router } from 'express';
import { UserController } from '../controllers/UserController';

export class UserRoute {
    private router = Router();
    private userController = new UserController();

    constructor () {
        this.initializeRoutes();
    }

    private initializeRoutes () {
        this.router.post('/login', this.userController.login.bind(this.userController));
    }

    public getRouter () {
        return this.router
    }
}

