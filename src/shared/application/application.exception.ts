export class ApplicationException extends Error {
    constructor(message:string = '⚠️ Generic Application Exception.') {
        super(message);
        this.name = 'ApplicationException';
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    };
};