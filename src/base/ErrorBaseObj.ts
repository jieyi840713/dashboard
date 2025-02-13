import { CodeType, CodeKyes } from "../interfaces/ErrorCode";
export class ErrorBaseObj extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(errorCode: CodeType[CodeKyes], isOperational = true){
        super(errorCode.message);
        this.statusCode = errorCode.code
        this.isOperational = isOperational;

        // 捕獲堆疊跟踪
        Error.captureStackTrace(this, this.constructor);
    }
}