import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { RecoverCategoryByIdUseCase } from "./recover-category-by-id.use-case";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let recoverCategoryByIdUseCase: RecoverCategoryByIdUseCase;

describe('Use Case: Recover Category by ID', () => {

    beforeAll(async () => {
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        recoverCategoryByIdUseCase = new RecoverCategoryByIdUseCase(categoryRepositoryMock);
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(categoryRepositoryMock);
    });

    test('Should Recover A Category by UUID', async () =>{

        const categoryInputDTO = {
            id: "8780ae8d-0d56-43d0-a45b-1a1143bb324f",
            name: "Cama"
        };

        categoryRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.recoverByUuid.mockResolvedValue(Category.recover(categoryInputDTO));

        const categoryOutputDTO: ICategory = await recoverCategoryByIdUseCase.execute(categoryInputDTO.id);

        expect(categoryOutputDTO)
            .toEqual(categoryInputDTO);

        expect(categoryRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(categoryRepositoryMock.recoverByUuid)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Recover A Category That Does Not Exist', async () => {
   
        const categoryInputDTO = {
           id: "8780ae8d-0d56-43d0-a45b-1a1143bb324f",
           name: "Cama"
       };

       categoryRepositoryMock.exists.mockResolvedValue(false);

       await expect(() => recoverCategoryByIdUseCase.execute("8780ae8d-0d56-43d0-a45b-1a1143bb324f"))
           .rejects
           .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
   });
});