import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { InsertCategoryUseCase } from "./insert-category.use-case";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { CreateCategoryProps, ICategory } from "@modules/catalog/domain/category/category.types";

let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let insertCategoryUseCase: InsertCategoryUseCase;

describe('Use Case: Insert Category', () => {

    beforeAll(async () => {
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        insertCategoryUseCase = new InsertCategoryUseCase(categoryRepositoryMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(categoryRepositoryMock);
    });

    test('Should Insert A Category', async () => {

        const categoryInputDTO: CreateCategoryProps = {
            name: 'Mesa'
        };

        const category: Category = Category.create(categoryInputDTO);

        categoryRepositoryMock.insert.mockResolvedValue(category);

        const categoryOutputDTO: ICategory = await insertCategoryUseCase.execute(category);

        expect(categoryOutputDTO)
            .toBeDefined();

        expect(categoryOutputDTO)
            .toMatchObject(
                expect.objectContaining({
                    id:expect.any(String),
                    name:expect.any(String)
                })
            );
        
        expect(categoryRepositoryMock.insert)
            .toHaveBeenCalledTimes(1);
    });
});