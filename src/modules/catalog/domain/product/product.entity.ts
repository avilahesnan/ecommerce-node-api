import { Entity } from "@shared/domain/entity";
import { ProductMap } from "@modules/catalog/infra/mappers/product.map";
import { CreateProductProps, IProduct, RecoverProductProps, StatusProduct } from "./product.types";
import { Category } from "../category/category.entity";
import { ProductExceptions } from "./product.exception";
import { RecoverCategoryProps } from "../category/category.types";

export class Product extends Entity<IProduct> implements IProduct {
    
    private _name: string = '';
    private _description: string = '';
    private _value: number = 0;
    private _categories: Category[] = [];
    private _dateCreated?: Date | undefined;
    private _dateUpdated?: Date | undefined;
    private _dateDeletion?: Date | null | undefined;
    private _status?: StatusProduct | undefined;

    public static readonly SIZE_MINIMUM_NAME = 5;
    public static readonly SIZE_MAXIMUM_NAME = 50;
    public static readonly SIZE_MINIMUM_DESCRIPTION = 10;
    public static readonly SIZE_MAXIMUM_DESCRIPTION = 200;
    public static readonly VALUE_MINIMUM = 0;
    public static readonly QTD_MINIMUM_CATEGORIES = 1;
    public static readonly QTD_MAXIMUM_CATEGORIES = 3;

    public get name(): string {
        return this._name;
    };

    private set name(name: string) {
        
        const sizeName = name.trim().length;

        if (name === null || name === undefined) {
            throw new ProductExceptions.NameProductNullOrUndefined();
        };

        if (sizeName < Product.SIZE_MINIMUM_NAME) {
            throw new ProductExceptions.NameProductSizeMinimumInvalid();
        };

        if (sizeName > Product.SIZE_MAXIMUM_NAME) {
            throw new ProductExceptions.NameProductSizeMaximumInvalid();
        };

        this._name = name;
    };

    public get description(): string {
        return this._description;
    };

    private set description(description: string) {

        const sizeDescription = description.trim().length;

        if (sizeDescription < Product.SIZE_MINIMUM_DESCRIPTION) {
            throw new ProductExceptions.NameDescriptionSizeMinimumInvalid();
        };

        if (sizeDescription > Product.SIZE_MAXIMUM_DESCRIPTION) {
            throw new ProductExceptions.NameDescriptionSizeMaximumInvalid();
        };

        this._description = description;
    };

    public get value(): number {
        return this._value;
    };
    
    private set value(value: number) {

        if (value < Product.VALUE_MINIMUM) {
            throw new ProductExceptions.ValueMinimumInvalid();
        };

        this._value = value;
    };

    public get categories(): Category[] {
        return this._categories;
    };

    private set categories(categories: Category[]) {

        const qtdCategories = categories.length;

        if (qtdCategories < Product.QTD_MINIMUM_CATEGORIES) {
            throw new ProductExceptions.QuantityCategoriesMinimumInvalid();
        };

        if (qtdCategories > Product.QTD_MAXIMUM_CATEGORIES) {
            throw new ProductExceptions.QuantityCategoriesMaximumInvalid();
        };

        this._categories = categories;
    };

    public get dateCreated(): Date | undefined {
        return this._dateCreated;
    };

    private set dateCreated(dateCreated: Date | undefined) {
        this._dateCreated = dateCreated;
    };

    public get dateUpdated(): Date | undefined {
        return this._dateUpdated;
    };

    private set dateUpdated(dateUpdated: Date | undefined) {
        this._dateUpdated = dateUpdated;
    };

    public get dateDeletion(): Date | null | undefined {
        return this._dateDeletion;
    };

    private set dateDeletion(dateDeletion: Date | null | undefined) {
        this._dateDeletion = dateDeletion;
    };

    public get status(): StatusProduct | undefined {
        return this._status;
    };

    private set status(status: StatusProduct | undefined) {
        this._status = status;
    };
    
    private constructor(props: IProduct) {
        super(props.id);
        this.name = props.name;
        this.description = props.description;
        this.value = props.value;
        this.categories = props.categories.map((category) => { return Category.recover(category as RecoverCategoryProps)});
        this.dateCreated = props.dateCreated;
        this.dateUpdated = props.dateUpdated;
        this.dateDeletion = props.dateDeletion;
        this.status = props.status;
    };

    public static create(props: CreateProductProps): Product {
        return new Product(props);
    };

    public static recover(props: RecoverProductProps): Product {
        return new Product(props);
    };

    public toDTO(): IProduct {
        return ProductMap.toDTO(this);
    };

    public isDeleted(): boolean {
        return this.dateDeletion !== null ? true : false;
    };

    public quantityCategories(): number {
        return this.categories.length;
    };

    public hasCategory(category: Category): boolean {

        const categoryExtant = this.categories.find((categoryExtant) => categoryExtant.id === category.id);

        if (categoryExtant) {
            return true;
        };
        
        return false;
    };

    public addCategory(category: Category): Category {

        if (this.quantityCategories() >= Product.QTD_MAXIMUM_CATEGORIES) {
            throw new ProductExceptions.ProductAlreadyHasQtdMaximumCategories();
        };

        if (this.hasCategory(category)) {
            throw new ProductExceptions.ProductAlreadyHasCategoryInformed();
        };

        this.categories.push(category);

        return category;
    };
    
    public removeCategory(category: Category): Category {

        const qtdCategoryInProduct: number = this.quantityCategories();

        const productNotHaveCategory: boolean = !this.hasCategory(category);

        if (qtdCategoryInProduct <= Product.QTD_MINIMUM_CATEGORIES) {
            throw new ProductExceptions.ProductAlreadyHasQtdMinimumCategories();
        };

        if (productNotHaveCategory) {
            throw new ProductExceptions.ProductNotHaveCategoryInformed();
        };

        this.categories.filter((categoryExtant, index, arrayCategories) => {
            if (categoryExtant.id === category.id) {
                arrayCategories.splice(index, 1);
            };
        });

        return category;
    };
};