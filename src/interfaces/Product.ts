import { RowDataPacket } from 'mysql2/promise';

export interface MadeBy {
    id: number;
    quantity: number
}

export interface Product extends RowDataPacket {
    id: number;
    name: string;
    descript: string;
    price: number;
    isAvailable: number;
    imageUrl: string;
    madeBy: MadeBy[];
    modifyUser: string;
    modifyTime: string;
    createUser: string;
    createTime: string;
}