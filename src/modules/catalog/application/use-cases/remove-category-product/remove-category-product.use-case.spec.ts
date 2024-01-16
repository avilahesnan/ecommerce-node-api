import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RemoveCategoryProductUseCase } from "./remove-category-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>;
let removeCategoryProductUseCase: RemoveCategoryProductUseCase;

describe('Use Case: Remove Category Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        removeCategoryProductUseCase = new RemoveCategoryProductUseCase(productRepositoryMock, categoryRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
        mockReset(categoryRepositoryMock);
    });

    test('Should Remove A Category From A Product', async () => {

        const category = {
            id: "7cb1c743-09b5-4532-bb54-91f29b765b5e",
            name: "Banho4"
        };

        const category2 = {
            id: "e06c520a-0af3-40c5-9d14-5482640447f6",
            name: "Banho5"
        }

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category, category2]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.exists.mockResolvedValue(true);

        productRepositoryMock.removeCategory.mockResolvedValue(true);

        const productOutputDTO: boolean = await removeCategoryProductUseCase.execute(productInputDTO);

        expect(productOutputDTO)
            .toBeTruthy();

        expect(productRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(categoryRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(productRepositoryMock.removeCategory)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Remove A Category From A Product That Do not Exist', async () => {
   
        const category = {
            id: "7cb1c743-09b5-4532-bb54-91f29b765b5e",
            name: "Banho4"
        };

        const category2 = {
            id: "e06c520a-0af3-40c5-9d14-5482640447f6",
            name: "Banho5"
        }

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category, category2]
        };

        productRepositoryMock.exists.mockResolvedValue(false);

        categoryRepositoryMock.exists.mockResolvedValue(true);

        await expect(() => removeCategoryProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });

    test('Should Throw An Exception When Trying to Remove A Category That Do not Exist From A Product', async () => {
   
        const category = {
            id: "7cb1c743-09b5-4532-bb54-91f29b765b5e",
            name: "Banho4"
        };

        const category2 = {
            id: "e06c520a-0af3-40c5-9d14-5482640447f6",
            name: "Banho5"
        }

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category, category2]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        categoryRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => removeCategoryProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
    });
});
