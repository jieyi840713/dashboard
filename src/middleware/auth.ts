import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const JWT_SECRET = '195c4c6511dd5c83cf531288342032cc34ca52c7a869efb9980a98ffb45babd950c7efcf3d27c8d8cda8e3f557ec20740c640573f51fbb5846e41a6bafa4b4a8';

export interface AuthRequest extends Request {
    user?: {username: string; roleCode: string}
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers.authorization;
    
    if(!authHeader){
        res.status(401).json({ message: '未提供認證令牌'})
        return
    }

    const token = authHeader;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as {username: string; roleCode: string};
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: '無效的認證令牌', error})
        return 
    }
}