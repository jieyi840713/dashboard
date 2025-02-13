import { RowDataPacket } from 'mysql2/promise';


export interface Inventory extends RowDataPacket {
    id?: number;
    ingredientId: number;
    quantity: string;
    cost: number;
    lastUpdated: string;
}