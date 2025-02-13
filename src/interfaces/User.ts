export enum RoleCode {
    Admin = 'admin',
    Manager = 'manager',
    Employee = 'employee'
}

export interface User {
    id?: number;
    roleCode: RoleCode;
    username: string;
    password: string;
    userStatus: number;
    modifyUser?: string;
    modifyTime?: string;
    createUser?: string;
    createTime?: string;
}