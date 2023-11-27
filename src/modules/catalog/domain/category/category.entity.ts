import { Entity } from "@shared/domain/entity";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { CreateCategoryProps, ICategory, RecoverCategoryProps } from "./category.types";
import { categoryExceptions } from "./category.exception";

export class Category extends Entity<ICategory> implements ICategory {

    private _name: string = '';
    private _dateCreated?: Date | undefined;
    private _dateUpdated?: Date | undefined;

    public static readonly SIZE_MINIMUM_NAME = 3;
    public static readonly SIZE_MAXIMUM_NAME = 50;
    
    public get name(): string {
        return this._name;
    };

    private set name(name: string) {

        const sizeName = name.trim().length;

        if (name === null || name === undefined) {
            throw new categoryExceptions.NameCategoryNullOrUndefined();
        };

        if (sizeName < Category.SIZE_MINIMUM_NAME) {
            throw new categoryExceptions.NameCategorySizeMinimumInvalid();
        };
        
        if (sizeName > Category.SIZE_MAXIMUM_NAME) {
            throw new categoryExceptions.NameCategorySizeMaximumInvalid();
        };

        this._name = name;
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

    private constructor(props: ICategory) {
        super(props.id);
        this.name = props.name;
        this.dateCreated = props.dateCreated;
        this.dateUpdated = props.dateUpdated;
    };

    public static create(props: CreateCategoryProps): Category {
        return new Category(props);
    };

    public static recover(props: RecoverCategoryProps): Category {
        return new Category(props);
    };

    public toDTO(): ICategory {
        return CategoryMap.toDTO(this);
    };
};