import { Router } from 'express';
import { upload } from '../middleware/upload';
import { UploadController } from '../controllers/UploadController';

export class UploadRoute {
    private router = Router();
    private uploadController = new UploadController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/', upload.single('file'), this.uploadController.uploadFile.bind(this.uploadController));
    }

    public getRouter() {
        return this.router;
    }
}