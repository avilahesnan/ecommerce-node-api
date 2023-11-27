import { PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { faker } from "@faker-js/faker";
import { ProductPrismaRepository } from "./product.prisma.repository";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { StatusProduct } from "@modules/catalog/domain/product/product.types";
import { Product } from "@modules/catalog/domain/product/product.entity";
import { ProductMap } from "../mappers/product.map";
import { productIncludeCategoryPrisma } from "@shared/infra/database/prisma.types";
import { CategoryMap } from "../mappers/category.map";


const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let productRepository: ProductPrismaRepository;
let UUIDValid: string;
let nameProductValid: string;
let nameCategoryValid: string;
let descriptionProductValid: string;
let valueProductValid: number;
let categoriesProductValid: Array<Category>;
let dateCreated: Date;
let dateUpdated: Date;
let dateDeletionProduct: Date;
let statusProductValid: StatusProduct;
let categoryOptional: Category;

describe('Prisma Repository: Product', () => {

    beforeAll(async () => {

        productRepository = new ProductPrismaRepository(prismaMock);

        const categoryValid01 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        const categoryValid02 = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        
        UUIDValid = faker.string.uuid();
        nameProductValid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_NAME, max:Product.SIZE_MAXIMUM_NAME}});
        nameCategoryValid = faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}});
        descriptionProductValid = faker.string.alpha({length:{min:Product.SIZE_MINIMUM_DESCRIPTION, max:Product.SIZE_MAXIMUM_DESCRIPTION}});
        valueProductValid = faker.number.int({min:Product.VALUE_MINIMUM});
        categoriesProductValid = faker.helpers.arrayElements([categoryValid01, categoryValid02], {min:Product.QTD_MINIMUM_CATEGORIES, max:Product.QTD_MAXIMUM_CATEGORIES});
        dateCreated = faker.date.anytime();
        dateUpdated = faker.date.anytime();
        dateDeletionProduct = faker.date.anytime();
        statusProductValid = faker.helpers.enumValue(StatusProduct);
        categoryOptional = Category.create({name:faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}})});
        
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });

    describe('Recover Product by ID', () => {

        test('Should Recover Product by UUID', async () => {            
            
            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.findUnique.mockResolvedValue(productPrisma);
            
            const product: Product = ProductMap.fromPrismaModeltoDomain(productPrisma);

            const productRecovered = await productRepository.recoverByUuid(product.id);

            expect(productRecovered)
                .toEqual(product);

            expect(prismaMock.product.findUnique)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.product.findUnique)
                .toBeCalledWith({
                    where: {
                        id: product.id
                    },
                    include: productIncludeCategoryPrisma
                });
        });
    });

    describe('Recover All Products', () => {

        test('Should Recover All Undeleted Products', async () => {

            const listProductsPrisma = [{
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: null,
                status: StatusProduct.ACTIVE
            },{
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: null,
                status: StatusProduct.ACTIVE
            }];

            prismaMock.product.findMany.mockResolvedValue(listProductsPrisma);
            
            const products: Array<Product> = listProductsPrisma.map((product) => ProductMap.fromPrismaModeltoDomain(product));

            const allProductsRecovereds = await productRepository.recoverAll();

            expect(allProductsRecovereds)
                .toStrictEqual(products);
            
            expect(prismaMock.product.findMany)
                .toHaveBeenCalledTimes(1);
        });
    });

    describe('Exists Product', () => {

        test('Should Check if A Certain Product Exists by UUID', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.findUnique.mockResolvedValue(productPrisma);

            const product: Product = ProductMap.fromPrismaModeltoDomain(productPrisma);

            const existsproduct = await productRepository.exists(product.id);

            expect(existsproduct)
                .toBeTruthy();
        });
    });

    describe('Insert Product', () => {

        test('Should Insert A Product', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.create.mockResolvedValue(productPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const productInserted = await productRepository.insert(product);

            expect(productInserted)
                .toStrictEqual(product);

            expect(prismaMock.product.create)
                .toHaveBeenCalledTimes(1);
            
            expect(prismaMock.product.create)
                .toBeCalledWith({
                    data: {
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        value: product.value,
                        categories: {
                            create: product.categories.map((category) => {
                                return {
                                    categoryId: category.id
                                }
                            })
                        }
                    }
                });
        });
    });

    describe('Update Product', () => {

        test('Should Update A Product', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.update.mockResolvedValue(productPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const productUpdated = await productRepository.update(product.id, product);

            expect(productUpdated)
                .toBeTruthy();

            expect(prismaMock.product.update)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.product.update)
                .toBeCalledWith({
                    where: { 
                        id: product.id
                    },
                    data: {
                        name: product.name,
                        description: product.description,
                        value: product.value
                    }
                });
        });
    });
    
    describe('Delete Product', () => {

        test('Should Delete A Product by UUID', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.update.mockResolvedValue(productPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const productDeleted = await productRepository.delete(product.id);

            expect(productDeleted)
                .toBeTruthy();

            expect(prismaMock.product.update)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.product.update)
                .toBeCalledWith({
                    where: { 
                        id: product.id
                    },
                    data: {
                        dateDeletion: new Date()
                    }
                });
        });
    });

    describe('Add Category to Product', () => {

        test('Should Add A Category to A Given Product', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            const productsCategoriesPrisma = {
                productId: UUIDValid,
                categoryId: UUIDValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated    
            };

            prismaMock.productsCategories.create.mockResolvedValue(productsCategoriesPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const category: Category = CategoryMap.toDomain(categoryOptional);

            const productCategoryAdded = await productRepository.addCategory(product, category);

            expect(productCategoryAdded)
                .toBeTruthy();

            expect(prismaMock.productsCategories.create)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.productsCategories.create)
                .toBeCalledWith({
                    data: {
                        productId: product.id,
                        categoryId: category.id
                    }
                });
        });
    });

    describe('Remove Category from Product', () => {

        test('Should Remove a Category from a Particular Product', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            const productsCategoriesPrisma = {
                productId: UUIDValid,
                categoryId: UUIDValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated    
            };

            prismaMock.productsCategories.delete.mockResolvedValue(productsCategoriesPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const category: Category = CategoryMap.toDomain(categoryOptional);

            const productCategoryRemoved = await productRepository.removeCategory(product, category);

            expect(productCategoryRemoved)
                .toBeTruthy();

            expect(prismaMock.productsCategories.delete)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.productsCategories.delete)
                .toBeCalledWith({
                    where: {
                        productId_categoryId: {
                            productId: product.id,
                            categoryId: category.id
                        }
                    }
                });
        });
    });

    describe('Alter Status Product', () => {

        test('Should Alter Product Status', async () => {

            const productPrisma = {
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: categoriesProductValid,
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: dateDeletionProduct,
                status: statusProductValid
            };

            prismaMock.product.update.mockResolvedValue(productPrisma);

            const product: Product = ProductMap.toDomain(productPrisma);

            const status = StatusProduct.OFF;

            const productStatusAltered = await productRepository.alterStatus(product, status);

            expect(productStatusAltered)
                .toBeTruthy();

            expect(prismaMock.product.update)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.product.update)
                .toBeCalledWith({
                    where: {
                        id: product.id
                    },
                    data: {
                        status: ProductMap.toStatusProductPrisma(status)
                    }
                });
        });
    });

    describe('Recover All Products by Category', () => {

        test('Should Recover All Products by Category', async () => {

            const listProductsPrisma = [{
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: null,
                status: StatusProduct.ACTIVE
            },{
                id: UUIDValid,
                name: nameProductValid,
                description: descriptionProductValid,
                value: valueProductValid,
                categories: [{
                    category: {
                        id: UUIDValid,
                        name: nameCategoryValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    },
                        productId: UUIDValid,
                        categoryId: UUIDValid,
                        dateCreated: dateCreated,
                        dateUpdated: dateUpdated
                    }
                ],
                dateCreated: dateCreated,
                dateUpdated: dateUpdated,
                dateDeletion: null,
                status: StatusProduct.ACTIVE
            }];

            prismaMock.product.findMany.mockResolvedValue(listProductsPrisma);
            
            const products: Array<Product> = listProductsPrisma.map((product) => ProductMap.fromPrismaModeltoDomain(product));

            const productsByCategory = await productRepository.recoverByCategory(UUIDValid);

            expect(productsByCategory)
                .toStrictEqual(products);
            
            expect(prismaMock.product.findMany)
                .toHaveBeenCalledTimes(1);
        });
    }) ;  
});