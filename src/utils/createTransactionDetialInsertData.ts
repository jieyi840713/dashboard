import { EntryType } from "../interfaces/EntryType"
import { InsertData } from "../interfaces/InsertData";
interface DetailData {
    transaction_id: number;
    chart_code: number;
    credit_amount: number | null;
    debit_amount: number | null;
    description: string | null;
    [key: string]: string | number | null;
}

export const createTransactionDetialInsertData = (transactionId: number, chartCode: number, type: EntryType, amount: number, description?: string)  => {
    const insertData: DetailData = {
        transaction_id: transactionId,
        chart_code: chartCode,
        description: description || null,
        credit_amount: type === EntryType.Credit ? amount : null,
        debit_amount: type === EntryType.Debit ? amount : null
    }

    return insertData as InsertData
}