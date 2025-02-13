import { RowDataPacket } from 'mysql2/promise';
import { MadeBy } from './Product';



export interface Order extends RowDataPacket {
    id?: number;
    employeeId: number;
    orderDate: string;
    totalAmount: number;
    status: OrderStatus;
    paymentMethod: string;
}

export interface OrderDetail extends RowDataPacket {
    id: number;
    orderId: number,
    productId: number;
    quantity: number;
    imageUrl: string;
    madeBy: MadeBy[];
    productName: string;
}

export interface OrderResponse {
    id: number;
    referenceNo: string;
    totalAmount: number;
    items: OrderDetail[]
}


export enum OrderStatus  {
    PREAPARE= 'prepare',
    COMPLETED= 'completed',
    CANCEL= 'cancel',
}