export class DomainException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'DomainException';
        this.message = '⚠️ Generic Domain Exception.';
        Error.captureStackTrace(this, this.constructor);
    };   
};

export class IDEntityUUIDInvalid extends DomainException {
    public constructor(message:string = '⚠️ The Entity ID is An Invalid UUID.') {
        super(message);
        this.name = 'IDEntityUUIDInvalid';
        this.message = message;
    };
};