import { ApplicationException } from "@shared/application/application.exception";

class CategoryApplicationException extends ApplicationException {
    constructor(message:string = '⚠️ Generic Application Exception of Entity Category.') {
        super(message);
        this.name = 'CategoryApplicationException';
        this.message = message;
    };
};

class CategoryNotFound extends CategoryApplicationException {
    public constructor(message:string = '⚠️ The Category Was Not Found in The Database.') {
        super(message);
        this.name = 'CategoryNotFound';
        this.message = message;
    };
};

export const CategoryApplicationExceptions = {
    CategoryNotFound: CategoryNotFound
};