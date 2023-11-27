import { ApplicationException } from "@shared/application/application.exception";

class ProductApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Product Entity Generic Application Exception.') {
        super(message);
        this.name = 'ProductApplicationException';
        this.message = message;
    };
};

class ProductNotFound extends ProductApplicationException {
    public constructor(message:string = '⚠️ The Product Was Not Found in The Database.') {
        super(message);
        this.name = 'ProductNotFound';
        this.message = message;
    };
};

export const ProductApplicationExceptions = {
    ProductNotFound: ProductNotFound
};