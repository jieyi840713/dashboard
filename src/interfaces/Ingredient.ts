import { RowDataPacket } from 'mysql2/promise';

export interface Ingredient extends RowDataPacket {
    id?: number;
    name: string;
    descript?: string;
    modifyUser?: string;
    modifyTime?: string;
    createUser?: string;
    createTime?: string;
}