import { PrismaClient } from "@prisma/client";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { faker } from "@faker-js/faker";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { CategoryPrismaRepository } from "./category.prisma.repository";
import { CategoryMap } from "../mappers/category.map";


const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let categoryRepository: CategoryPrismaRepository;
let UUIDValid: string;
let nameCategoryValid: string;
let dateCreatedCategory: Date;
let dateUpdatedCategory: Date;

describe('Prisma Repository: Category', () => {

    beforeAll(async () => {
        
        categoryRepository = new CategoryPrismaRepository(prismaMock);

        UUIDValid = faker.string.uuid();
        nameCategoryValid = faker.string.alpha({length:{min:Category.SIZE_MINIMUM_NAME, max:Category.SIZE_MAXIMUM_NAME}});
        dateCreatedCategory = faker.date.anytime();
        dateUpdatedCategory = faker.date.anytime();
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });

    describe('Recover Category by ID', () => {

        test('Should Recover A Category by UUID', async () => {

            const categoryPrisma = {
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            };

            prismaMock.category.findUnique.mockResolvedValue(categoryPrisma);

            const category: Category = CategoryMap.toDomain(categoryPrisma);

            const categoryRecovered = await categoryRepository.recoverByUuid(category.id);

            expect(categoryRecovered)
                .toEqual(category);

            expect(prismaMock.category.findUnique)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.category.findUnique)
                .toBeCalledWith({
                    where: {
                        id: category.id
                    }
                });
        });
    });

    describe('Recover All Categories', () => {

        test('Should Recover All Categories Without Exception', async () => {

            const listCategoriesPrisma = [{
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            },{
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            }];

            prismaMock.category.findMany.mockResolvedValue(listCategoriesPrisma);

            const categories: Array<Category> = listCategoriesPrisma.map((category) => CategoryMap.fromPrismaModeltoDomain(category));

            const allCategoriesRecovereds = await categoryRepository.recoverAll();

            expect(allCategoriesRecovereds)
                .toStrictEqual(categories);
            
            expect(prismaMock.category.findMany)
                .toHaveBeenCalledTimes(1);
        });
    });

    describe('Exists Category', () => {

        test('Should Check if A Certain Category Exists by UUID', async () => {

            const categoryPrisma = {
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            };

            prismaMock.category.findUnique.mockResolvedValue(categoryPrisma);

            const existsCategory = await categoryRepository.exists(categoryPrisma.id);

            expect(existsCategory)
                .toBeTruthy();
        });
    });

    describe('Insert Category', () => {

        test('Should Insert A Category', async () => {

            const categoryPrisma = {
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            };

            prismaMock.category.create.mockResolvedValue(categoryPrisma);

            const category: Category = CategoryMap.toDomain(categoryPrisma);

            const categoryInserted = await categoryRepository.insert(category);

            expect(categoryInserted)
                .toStrictEqual(category);

            expect(prismaMock.category.create)
                .toHaveBeenCalledTimes(1);
            
            expect(prismaMock.category.create)
                .toBeCalledWith({
                    data: {
                        id: category.id,
                        name: category.name
                    }
                });
        });
    });

    describe('Update Category', () => {

        test('Should Update A Category', async () => {

            const categoryPrisma = {
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            };

            prismaMock.category.update.mockResolvedValue(categoryPrisma);

            const category: Category = CategoryMap.toDomain(categoryPrisma);

            const categoryUpdated = await categoryRepository.update(category.id, category);

            expect(categoryUpdated)
                .toBeTruthy();

            expect(prismaMock.category.update)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.category.update)
                .toBeCalledWith({
                    where: { 
                        id: category.id 
                    },
                    data: categoryPrisma
                });
        });
    });

    describe('Delete Category', () => {

        test('Should Delete A Category By UUID', async () => {

            const categoryPrisma = {
                id: UUIDValid,
                name: nameCategoryValid,
                dateCreated: dateCreatedCategory,
                dateUpdated: dateUpdatedCategory
            };

            prismaMock.category.delete.mockResolvedValue(categoryPrisma);

            const category: Category = CategoryMap.toDomain(categoryPrisma);

            const categoryDeleted = await categoryRepository.delete(category.id);

            expect(categoryDeleted)
                .toBeTruthy();

            expect(prismaMock.category.delete)
                .toHaveBeenCalledTimes(1);

            expect(prismaMock.category.delete)
                .toBeCalledWith({
                    where: { 
                        id: category.id 
                    }
                });
        });
    });
});