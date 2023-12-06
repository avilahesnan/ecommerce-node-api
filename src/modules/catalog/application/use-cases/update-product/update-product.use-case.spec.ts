import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { UpdateProductUseCase } from "./update-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let updateProductUseCase: UpdateProductUseCase;

describe('Use Case: Update Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        updateProductUseCase = new UpdateProductUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });

    test('Should Update A Product', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [CategoryMap.toDomain(category)]
        };
        
        productRepositoryMock.exists.mockResolvedValue(true);
        
        productRepositoryMock.update.mockResolvedValue(true);

        const productOutputDTO: boolean = await updateProductUseCase.execute(productInputDTO);

        expect(productOutputDTO)
            .toBeTruthy();

        expect(productRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(productRepositoryMock.update)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Update A Product That Does Not Exist', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: RecoverProductProps = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [CategoryMap.toDomain(category)]
        };

        productRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => updateProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });
});