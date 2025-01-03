import {hashPwd, getIsPasswordMatch} from '../utils/hashUtil'
import { UserDao } from '../dao/UserDao';

export class UserService {

    private UserDao: UserDao;

    constructor () {
            this.UserDao = new UserDao()
        }

    async login(username: string, password: string) {
        const user = await this.UserDao.getUserByUsername(username)
        if(!user) throw new Error("Can't find this username")
        const isPasswordMatch =  getIsPasswordMatch(password, user.password)
        if(!isPasswordMatch) throw new Error("Password is wrong!")
        return 'login success'
    }

    // async createUser (roleCode, username, password, userStatus) {
    //     const 
    // }

}