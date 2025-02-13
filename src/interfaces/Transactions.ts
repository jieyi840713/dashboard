import { RowDataPacket } from 'mysql2/promise';

export enum TransactionStatus {
    DRAFT = 'draft',
    POSTED = 'posted',
    VOIDED = 'voided'
}

export enum TransactionType {
    SALE = 'sale',
    PURCHASE = 'purchase',
    PAYMENT = 'payment',
    RECEIPT = 'receipt',
    ADJSUTMENT = 'adjustment'
}

export interface Transaction extends RowDataPacket {
    id: number,
    referenceNo: string,
    description: string,
    transactionType: string,
    status: string
}