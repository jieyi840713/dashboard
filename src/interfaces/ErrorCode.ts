export enum CodeKyes {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    CAN_NOT_FIND_USER = 'CAN_NOT_FIND_USER',
    PASSWORD_IS_WRONG = 'PASSWORD_IS_WRONG',
    DEBIT_AND_CREDIT_ARE_NOT_EQUAL = 'DEBIT_AND_CREDIT_ARE_NOT_EQUAL',
    AMOUNT_NOT_BE_ZERO = 'AMOUNT_NOT_BE_ZERO',
    AT_LEAST_ADD_ONE_INGREDIENT = 'AT_LEAST_ADD_ONE_INGREDIENT',
    CANT_FIND_THIS_REFERENCE_NO = 'CANT_FIND_THIS_REFERENCE_NO',
    INVALID_PARAMETERS = 'INVALID_PARAMETERS',
}

export type CodeType = {
    [key in CodeKyes]: {
        code: number;
        message: string;
    }
}

export const ErrorCode: CodeType= {
    SUCCESS: {code: 0, message: 'success'},
    ERROR: {code: 1, message: 'error occurred'},
    CAN_NOT_FIND_USER: {code: 2, message: "Can't find this username"},
    PASSWORD_IS_WRONG: {code: 2, message: "Password is wrong!"},
    DEBIT_AND_CREDIT_ARE_NOT_EQUAL: {code: 3, message: "借貸金額不同"},
    AMOUNT_NOT_BE_ZERO: {code: 4, message: "金額不能為0"},
    AT_LEAST_ADD_ONE_INGREDIENT: {code: 5, message: "需填入至少一筆材料"},
    CANT_FIND_THIS_REFERENCE_NO: {code: 6, message: "查不到該筆referenceNo交易"},
    INVALID_PARAMETERS: {code: 7, message: "Invalid parameters"},
}