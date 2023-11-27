import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from "vitest";
import { Category } from '../category/category.entity';
import { Product } from './product.entity';
import { CreateProductProps } from './product.types';
import { ProductExceptions } from './product.exception';

let nameProductValid: string;
let nameProductSizeMinimumInvalid: string;
let nameProductSizeMaximumInvalid: string;
let descriptionProductValid: string;
let descriptionSizeMinimumInvalid: string;
let descriptionSizeMaximumInvalid: string;
let valueProductValid: number;
let valueMinimumInvalid: number;
let categoriesValid: Array<Category>;
let quantityCategoriesMinimumInvalid: Array<Category>;
let quantityCategoriesMaximumInvalid: Array<Category>;
let UUIDValid: string;
let categoriesQtdValidAptAddition: Array<Category>;
let categoriesQtdMaxValidIneptAddition: Array<Category>;
let categoriesQtdValidIneptAdditionDoubling: Array<Category>;
let categoryQtdValidAptRemoval: Array<Category>;
let categoryQtdMinValidIneptRemoval: Array<Category>;
let categoryQtdValidIneptRemovalNotAssociate: Array<Category>;

describe('Domain Entity: Product', () => {

    beforeAll(async () => {

        const categoryValid01 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        const categoryValid02 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        const categoryValid03 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        const categoryValid04 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
    
        UUIDValid = faker.string.uuid();
        nameProductValid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_NAME, max:Product.SIZE_MAXIMUM_NAME}});
        nameProductSizeMinimumInvalid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_NAME-1, max:Product.SIZE_MINIMUM_NAME-1}});
        nameProductSizeMaximumInvalid = faker.string.alpha({length:{min:Product.SIZE_MAXIMUM_NAME+1, max:Product.SIZE_MAXIMUM_NAME+1}});
        descriptionProductValid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_DESCRIPTION, max:Product.SIZE_MAXIMUM_DESCRIPTION}});
        descriptionSizeMinimumInvalid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_DESCRIPTION-1, max:Product.SIZE_MINIMUM_DESCRIPTION-1}});
        descriptionSizeMaximumInvalid = faker.string.alpha({length:{min:Product.SIZE_MAXIMUM_DESCRIPTION+1, max:Product.SIZE_MAXIMUM_DESCRIPTION+1}});
        valueProductValid = faker.number.int({min:Product.VALUE_MINIMUM, max:Product.VALUE_MINIMUM});
        valueMinimumInvalid = faker.number.int({min:Product.VALUE_MINIMUM-1, max:Product.VALUE_MINIMUM-1});
        categoriesValid = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02, categoryValid03], {min:Product.QTD_MINIMUM_CATEGORIES, max:Product.QTD_MAXIMUM_CATEGORIES});
        quantityCategoriesMinimumInvalid = [];
        quantityCategoriesMaximumInvalid = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02, categoryValid03, categoryValid04], {min:Product.QTD_MAXIMUM_CATEGORIES+1, max:Product.QTD_MAXIMUM_CATEGORIES+1});
        categoriesQtdValidAptAddition = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02], {min:Product.QTD_MINIMUM_CATEGORIES, max:Product.QTD_MAXIMUM_CATEGORIES-1});
        categoriesQtdMaxValidIneptAddition = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02, categoryValid03], {min:Product.QTD_MAXIMUM_CATEGORIES, max:Product.QTD_MAXIMUM_CATEGORIES});
        categoriesQtdValidIneptAdditionDoubling = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02], {min:Product.QTD_MINIMUM_CATEGORIES, max:Product.QTD_MINIMUM_CATEGORIES+1});
        categoryQtdValidAptRemoval = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02, categoryValid03], {min:Product.QTD_MINIMUM_CATEGORIES+1, max:Product.QTD_MAXIMUM_CATEGORIES});
        categoryQtdMinValidIneptRemoval = faker.helpers.arrayElements<Category>([categoryValid01], {min:Product.QTD_MINIMUM_CATEGORIES, max:Product.QTD_MINIMUM_CATEGORIES});
        categoryQtdValidIneptRemovalNotAssociate = faker.helpers.arrayElements<Category>([categoryValid01, categoryValid02, categoryValid03], {min:Product.QTD_MINIMUM_CATEGORIES+1, max:Product.QTD_MAXIMUM_CATEGORIES});
    
    });

    describe('Product (create)', () => { 
        
        test('Should Create A Valid Product - ', async () => {

            const productValid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesValid
            };

            expect(Product.create(productValid))
                .to.be.instanceOf(Product);
        });
        
        test('Should Not Create Product With Invalid Name - Minimum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductSizeMinimumInvalid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesValid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.NameProductSizeMinimumInvalid);
        });

        test('Should Not Create Product With Invalid Name - Maximum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductSizeMaximumInvalid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesValid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.NameProductSizeMaximumInvalid);
        });

        test('Should Not Create Product With Invalid Description - Minimum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionSizeMinimumInvalid,
                value: valueProductValid,
                categories: categoriesValid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.NameDescriptionSizeMinimumInvalid);
        });

        test('Should Not Create Product With Invalid Description - Maximum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionSizeMaximumInvalid,
                value: valueProductValid,
                categories: categoriesValid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.NameDescriptionSizeMaximumInvalid);
        });

        test('Should Not Create Product With Invalid Value - Minimum Value', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueMinimumInvalid,
                categories: categoriesValid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.ValueMinimumInvalid);
        });

        test('Should Not Create Product With Invalid Category - Minimum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: quantityCategoriesMinimumInvalid
            };

            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.QuantityCategoriesMinimumInvalid);
        });

        test('Should Not Create Product With Invalid Category - Maximum Size', () => {

            const productInvalid: CreateProductProps = {
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: quantityCategoriesMaximumInvalid
            };
            
            expect(() => Product.create(productInvalid))
                .toThrowError(ProductExceptions.QuantityCategoriesMaximumInvalid);
        }) ; 
    });

    describe('Product (add Category)', () => {

        test('Should Add A Valid Category to A Valid Product That is Able to Have A New Category', async () => {
            
            const productValidAptNewCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesQtdValidAptAddition
            });

            const categoryValid = Category.create({name:faker.string.alpha({length:{min:3, max:50}})});

            expect(productValidAptNewCategory.addCategory(categoryValid))
                .toBe(categoryValid);
            
            expect(productValidAptNewCategory.categories)
                .toContain(categoryValid);
        });

        test('Should Not Add A Valid Category to A Valid Product Unable to Have A New Category - Maximum Category Quantity', async () => {
            
            const productValidIneptNewCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesQtdMaxValidIneptAddition
            });

            const categoryValid = Category.create({name:faker.string.alpha({length:{min:3, max:50}})});

            expect(() => productValidIneptNewCategory.addCategory(categoryValid))
                .toThrowError(ProductExceptions.ProductAlreadyHasQtdMaximumCategories);
        });

        test('Should Not Add A Valid Category to A Valid Product That is Unable to Have A New Category - Category Already Added', async () => {
            
            const productValidIneptNewCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesQtdValidIneptAdditionDoubling
            });

            const categoryValid = categoriesQtdValidIneptAdditionDoubling[0];

            expect(() => productValidIneptNewCategory.addCategory(categoryValid))
                .toThrowError(ProductExceptions.ProductAlreadyHasCategoryInformed);
        });
    });

    describe('Product (remove Category)', () => {

        test('Should Remove A Valid Category from A Valid Product That Can Have A Category Removed', async () => {
            
            const productValidAptRemoveCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoryQtdValidAptRemoval
            });

            const categoryValid = categoryQtdValidAptRemoval[0];

            expect(productValidAptRemoveCategory.removeCategory(categoryValid))
                .toBe(categoryValid);

            expect(productValidAptRemoveCategory.categories)
                .not.toContain(categoryValid);
        });

        test('Should Not Remove A Valid Category From A Valid Product That Is Unable to Have A Category Removed - Minimum Category Quantity',async () => {
            
            const productValidIneptRemoveCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoryQtdMinValidIneptRemoval
            });

            const categoryValid = categoryQtdMinValidIneptRemoval[0];

            expect(() => productValidIneptRemoveCategory.removeCategory(categoryValid))
                .toThrowError(ProductExceptions.ProductAlreadyHasQtdMinimumCategories);
        });

        test('Should Not Remove A Valid Category From A Valid Product That Is Unable to Have A Category Removed - Category Not Associated With The Product',async () => {
            
            const productValidIneptRemoveCategory: Product = Product.recover({
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoryQtdValidIneptRemovalNotAssociate
            });

            const categoryValid = Category.create({name:faker.string.alpha({length:{min:3, max:50}})});

            expect(() => productValidIneptRemoveCategory.removeCategory(categoryValid))
                .toThrowError(ProductExceptions.ProductNotHaveCategoryInformed);
        });
    });
});