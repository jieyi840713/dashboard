export interface Order {
    id?: number;
    employeeId: number;
    orderDate: string;
    totalAmount: number;
    status: string;
    paymentMethod: string;
    table?: number;
}