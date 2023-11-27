import { DomainException } from "@shared/domain/domain.exception";

class ProductException extends DomainException {
  constructor(message:string = '⚠️ Product Entity Generic Domain Exception.') {
    super(message);
    this.name = 'ProductException';
    this.message = message;
  };
};

class NameProductNullOrUndefined extends ProductException {
  public constructor(message:string = '⚠️ The Product Name is Null or Undefined.') {
    super(message);
    this.name = 'NameProductNullOrUndefined';
    this.message = message;
  };
};

class NameProductSizeMinimumInvalid extends ProductException {
  public constructor(message:string = '⚠️ The Product Name Does Not Have A Valid Minimum Size.') {
    super(message);
    this.name = 'NameProductSizeMinimumInvalid';
    this.message = message;
  };
};

class NameProductSizeMaximumInvalid extends ProductException {
  public constructor(message:string = '⚠️ The Product Name Does Not Have A Valid Maximum Size.') {
    super(message);
    this.name = 'NameProductSizeMaximumInvalid';
    this.message = message;
  };
};

class NameDescriptionSizeMinimumInvalid extends ProductException {
  public constructor(message:string = '⚠️ The Description Name Does Not Have A Valid Minimum Size.') {
    super(message);
    this.name = 'NameDescriptionSizeMinimumInvalid';
    this.message = message;
  };
};
  
class NameDescriptionSizeMaximumInvalid extends ProductException {
  public constructor(message:string = '⚠️ The Description Name Does Not Have A Valid Maximum Size.') {
    super(message);
    this.name = 'NameDescriptionSizeMaximumInvalid';
    this.message = message;
  };
};

class ValueMinimumInvalid extends ProductException {
  public constructor(message:string = '⚠️ The Value Does Not Have The Minimum Valid Value.') {
    super(message);
    this.name = 'ValueMinimumInvalid';
    this.message = message;
  };
};

class QuantityCategoriesMinimumInvalid extends ProductException {
  public constructor(message:string = '⚠️ Categories Do Not Have A Valid Minimum Size.') {
    super(message);
    this.name = 'QuantityCategoriesMinimumInvalid';
    this.message = message;
  };
};

class QuantityCategoriesMaximumInvalid extends ProductException {
  public constructor(message:string = '⚠️ Categories Do Not Have A Valid Maximum Size.') {
    super(message);
    this.name = 'QuantityCategoriesMaximumInvalid';
    this.message = message;
  };
};
  
class ProductAlreadyHasQtdMinimumCategories extends ProductException {
  public constructor(message:string = '⚠️ The Product Already Has The Category Minimum.') {
    super(message);
    this.name = 'ProductAlreadyHasQtdMinimumCategories';
    this.message = message;
  };
};

class ProductAlreadyHasQtdMaximumCategories extends ProductException {
  public constructor(message:string = '⚠️ The Product Already Has The Category Maximum.') {
    super(message);
    this.name = 'ProductAlreadyHasQtdMaximumCategories';
    this.message = message;
  };
};

class ProductAlreadyHasCategoryInformed extends ProductException {
  public constructor(message:string = '⚠️ The Product Already Has The Category Informed.') {
    super(message);
    this.name = 'ProductAlreadyHasCategoryInformed';
    this.message = message;
  };
};

class ProductNotHaveCategoryInformed extends ProductException {
  public constructor(message:string = '⚠️ The Product Does Not Have The Category Informed.') {
    super(message);
    this.name = 'ProductNotHaveCategoryInformed';
    this.message = message;
  };
};

export const ProductExceptions = {
  ProductException: ProductException,
  NameProductNullOrUndefined: NameProductNullOrUndefined,
  NameProductSizeMinimumInvalid: NameProductSizeMinimumInvalid,
  NameProductSizeMaximumInvalid: NameProductSizeMaximumInvalid,
  NameDescriptionSizeMinimumInvalid: NameDescriptionSizeMinimumInvalid,
  NameDescriptionSizeMaximumInvalid: NameDescriptionSizeMaximumInvalid,
  ValueMinimumInvalid: ValueMinimumInvalid,
  QuantityCategoriesMinimumInvalid: QuantityCategoriesMinimumInvalid,
  QuantityCategoriesMaximumInvalid: QuantityCategoriesMaximumInvalid,
  ProductAlreadyHasQtdMinimumCategories: ProductAlreadyHasQtdMinimumCategories,
  ProductAlreadyHasQtdMaximumCategories: ProductAlreadyHasQtdMaximumCategories,
  ProductAlreadyHasCategoryInformed: ProductAlreadyHasCategoryInformed,
  ProductNotHaveCategoryInformed: ProductNotHaveCategoryInformed
};