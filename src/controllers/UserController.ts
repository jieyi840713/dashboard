import { Request, Response, NextFunction } from "express";
import { UserService } from '../services/UserService';

export class UserController {
    private userService = new UserService();

    public async login(req: Request, res: Response, next: NextFunction){
        try{
            const {username, password} = req.body;
            const users = await this.userService.login(username, password);
            res.json(users)
        }catch(error){
            next(error);
        }
    }

}