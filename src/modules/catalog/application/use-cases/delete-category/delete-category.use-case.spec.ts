import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { DeleteCategoryUseCase } from "./delete-category.use-case";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let deleteCategoryUseCase: DeleteCategoryUseCase;

describe('Use Case: Delete Category', () => {
    
    beforeAll(async () => {
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepositoryMock);
    });

    afterEach(async () => {
        vi.restoreAllMocks();
        mockReset(categoryRepositoryMock);
    });

    test('Should Delete A Category', async () => {
        
        const categoryInputDTO = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: 'Mesa'
        };

        categoryRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.delete.mockResolvedValue(true);

        const categoryOutputDTO: boolean = await deleteCategoryUseCase.execute(categoryInputDTO.id);

        expect(categoryOutputDTO)
            .toBeTruthy();
        
        expect(categoryRepositoryMock.delete)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Delete A Category That Does Not Exist', async () => {
   
        const categoryInputDTO = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: 'Mesa'
        };

        categoryRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => deleteCategoryUseCase.execute(categoryInputDTO.id))
            .rejects
            .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
    });
});