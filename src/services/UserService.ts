import { getIsPasswordMatch } from '../utils/hashUtil'
import { UserDao } from '../dao/UserDao';
import { ErrorBaseObj } from '../base/ErrorBaseObj';
import { ErrorCode } from '../interfaces/ErrorCode';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '195c4c6511dd5c83cf531288342032cc34ca52c7a869efb9980a98ffb45babd950c7efcf3d27c8d8cda8e3f557ec20740c640573f51fbb5846e41a6bafa4b4a8';

export class UserService {

    private UserDao: UserDao;

    constructor () {
            this.UserDao = new UserDao()
        }

    async login(username: string, password: string) {
        const user = await this.UserDao.getUserByUsername(username)
        if(!user) throw new ErrorBaseObj(ErrorCode.CAN_NOT_FIND_USER)
        const isPasswordMatch =  getIsPasswordMatch(password, user.password)
        if(!isPasswordMatch) throw new ErrorBaseObj(ErrorCode.PASSWORD_IS_WRONG)
        // 產生jwt
        const token = jwt.sign(
            {username: user.username, roleCode: user.roleCode},
            JWT_SECRET,
            {expiresIn: '24h'}
        )

        return {message: 'login success', token, user: {username: user.username, roleCode: user.roleCode}}
    }

}