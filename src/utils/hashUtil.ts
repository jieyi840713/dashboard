import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPwd = (password: string) => {
    return bcrypt.hashSync(password, saltRounds);
}

export const getIsPasswordMatch  = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}
