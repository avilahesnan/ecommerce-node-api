import { DomainException } from "@shared/domain/domain.exception";

export class CategoryException extends DomainException {
    constructor(message:string = '⚠️ Generic Domain Exception of The Category Entity.') {
        super(message);
        this.name = 'CategoryException';
        this.message = message;
    };
};

export class NameCategoryNullOrUndefined extends CategoryException {
    public constructor(message:string = '⚠️ The Category Name is Null or Undefined.') {
        super(message);
        this.name = 'NameCategoryNullOrUndefined';
        this.message = message;
    };
};

export class NameCategorySizeMinimumInvalid extends CategoryException {
    public constructor(message:string = '⚠️ The Category Name Does Not Have A Valid Minimum Size.') {
        super(message);
        this.name = 'NameCategorySizeMinimumInvalid';
        this.message = message;
    };
};

export class NameCategorySizeMaximumInvalid extends CategoryException {
    public constructor(message:string = '⚠️ The Category Name Does Not Have A Valid Maximum Size.') {
        super(message);
        this.name = 'NameCategorySizeMaximumInvalid';
        this.message = message;
    };
};

export const categoryExceptions = {
    CategoryException: CategoryException,
    NameCategoryNullOrUndefined: NameCategoryNullOrUndefined,
    NameCategorySizeMinimumInvalid: NameCategorySizeMinimumInvalid,
    NameCategorySizeMaximumInvalid: NameCategorySizeMaximumInvalid
};