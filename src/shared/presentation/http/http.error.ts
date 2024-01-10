export class HttpError extends Error {
    statusCode: number;

    constructor(statusCode:number, message: string = '⚠️ Generic HTTP Error') {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, HttpError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

class NotFoundError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 404, message || '⚠️ Server Could Not Find the Requested Resource.');
        this.name = 'NotFoundError';
    }
}

class UnsupportedMediaTypeError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 415, message || '⚠️ Server Refused to Accept Request Because Payload Format Is Not Supported.');
        this.name = 'UnsupportedMediaTypeError';
    }
}

class UnauthorizedError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 401, message || '⚠️ Client Request Was Not Completed Because It Does Not Have Valid Authentication Credentials for the Requested Resource.');
        this.name = 'UnauthorizedError';
    }
}

class ForbiddenError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 403, message || '⚠️ Server understands the request, but refuses to authorize it.');
        this.name = 'ForbiddenError';
    }
}

export const HttpErrors = {
    NotFoundError: NotFoundError,
    UnsupportedMediaTypeError: UnsupportedMediaTypeError,
    UnauthorizedError: UnauthorizedError,
    ForbiddenError: ForbiddenError
}
