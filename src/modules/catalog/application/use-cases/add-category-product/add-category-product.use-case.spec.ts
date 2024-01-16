import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { AddCategoryProductUseCase } from "./add-category-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let addCategoryProductUseCase: AddCategoryProductUseCase;

describe('Use Case: Add Category Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        addCategoryProductUseCase = new AddCategoryProductUseCase(productRepositoryMock, categoryRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
        mockReset(categoryRepositoryMock);
    });

    test('Should Add A Category to A Product', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.exists.mockResolvedValue(true);

        productRepositoryMock.addCategory.mockResolvedValue(true);

        const productOutputDTO: boolean = await addCategoryProductUseCase.execute(productInputDTO);

        expect(productOutputDTO)
            .toBeTruthy();

        expect(productRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(categoryRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(productRepositoryMock.addCategory)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Add A Category to A Product That Do not Exist', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        };

        productRepositoryMock.exists.mockResolvedValue(false);

        categoryRepositoryMock.exists.mockResolvedValue(true);

        await expect(() => addCategoryProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });

    test('Should Throw An Exception When Trying to Add A Category That Do not Exist to A Product', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => addCategoryProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
    });
});
