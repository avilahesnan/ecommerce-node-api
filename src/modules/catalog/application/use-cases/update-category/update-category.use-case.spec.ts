import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { UpdateCategoryUseCase } from "./update-category.use-case";
import { RecoverCategoryProps } from "@modules/catalog/domain/category/category.types";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let updateCategoryUseCase: UpdateCategoryUseCase;

describe('Use Case: Update Category', () => {

    beforeAll(async () => {
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepositoryMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(categoryRepositoryMock);
    });

    test('Should Update A Category', async () => {

        const categoryInputDTO: RecoverCategoryProps = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: 'Mesa'
        };
        
        categoryRepositoryMock.exists.mockResolvedValue(true);
        
        categoryRepositoryMock.update.mockResolvedValue(true);

        const categoryOutputDTO: boolean = await updateCategoryUseCase.execute(categoryInputDTO);

        expect(categoryOutputDTO)
            .toBeTruthy();

        expect(categoryRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(categoryRepositoryMock.update)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Update A Category That Does Not Exist', async () => {
   
        const categoryInputDTO = {
            id: "8780ae8d-0d56-43d0-a45b-1a1143bb324f",
            name: "Cama"
        };

        categoryRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => updateCategoryUseCase.execute(categoryInputDTO))
            .rejects
            .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
    });
});