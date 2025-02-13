import {Request, Response, NextFunction} from 'express';

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        error: error.message
    });
    next();
}

export const notFoundHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    res.status(404).json({
        status: 'error',
        message: `找不到路徑: ${req.originalUrl}`
    });
    next()
}