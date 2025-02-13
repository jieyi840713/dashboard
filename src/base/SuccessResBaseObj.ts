export class SuccessResBaseObj {
    code;
    message;
    data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(data?: any){
        this.code = 0;
        this.message = 'Success'
        if(data) this.data = data
    }
}