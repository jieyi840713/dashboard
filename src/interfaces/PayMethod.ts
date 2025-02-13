import { ChartOfAccounts } from "./ChartOfAccounts";
export type PayMethod  = 'Cash' |'Accounts_Receivable' |'Account_Payable';

const PAYMENT_METHOD_MAP: Record<PayMethod, ChartOfAccounts> = {
    'Cash': ChartOfAccounts.Cash,
    'Accounts_Receivable': ChartOfAccounts.Accounts_Receivable,
    'Account_Payable': ChartOfAccounts.Accounts_Payable
};

export const getAccountNumberByPayMethod = (payMethod: PayMethod) :number =>{
    return PAYMENT_METHOD_MAP[payMethod]
}

export enum PaymentMethod {
    Cash = 'cash',
    Credit = 'credit',
    Online = 'online'
}