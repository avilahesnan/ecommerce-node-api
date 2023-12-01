import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { DeleteProductUseCase } from "./delete-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let deleteProductUseCase: DeleteProductUseCase;

describe('Use Case: Delete Product', async () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        deleteProductUseCase = new DeleteProductUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });
    
    test('Should Delete A Product', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [CategoryMap.toDomain(category)]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        productRepositoryMock.delete.mockResolvedValue(true);

        const productOutputDTO: boolean = await deleteProductUseCase.execute(productInputDTO.id);

        expect(productOutputDTO)
            .toBeTruthy();

        expect(productRepositoryMock.delete)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Delete A Product That Does Not Exist', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [CategoryMap.toDomain(category)]
        };

        productRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => deleteProductUseCase.execute("a22a6030-bf2f-424b-b72e-2ca49e774094"))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });
});