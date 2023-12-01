import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { RecoverAllCategoriesUseCase } from "./recover-all-categories.use-case";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { ICategory } from "@modules/catalog/domain/category/category.types";

let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let recoverAllCategoriesUseCase: RecoverAllCategoriesUseCase;

describe('Use Case: Recover All Categories', () => {

    beforeAll(async () => {
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        recoverAllCategoriesUseCase = new RecoverAllCategoriesUseCase(categoryRepositoryMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(categoryRepositoryMock);
    });

    test('Should Recover All Categories Without Exception', async () => {

        const listCategories = [{
                id: "06e7b01d-28d6-423f-91b4-2a21063a2a72",
                name: "Cama"
            },{
                id: "bb97a1e8-d09f-462f-b8e6-acb2e31af92c",
                name: "Sala de Estar"
            }];

        const categories: Array<Category> = listCategories.map((category) => CategoryMap.fromPrismaModeltoDomain(category));

        categoryRepositoryMock.recoverAll.mockResolvedValue(categories);

        const categoriesDTO = categories.map((category) => CategoryMap.toDTO(category));

        const categoriesOutputDTO: Array<ICategory> = await recoverAllCategoriesUseCase.execute();

        expect(categoriesOutputDTO)
            .toStrictEqual(categoriesDTO);
            
        expect(categoryRepositoryMock.recoverAll)
            .toHaveBeenCalledTimes(1);
    });
});