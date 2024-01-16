import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverProductByIdUseCase } from "./recover-product-by-id.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let recoverProductByIdUseCase: RecoverProductByIdUseCase;

describe('Use Case: Recover Product By Id', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        recoverProductByIdUseCase = new RecoverProductByIdUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });

    test('Should Recover Product By Id', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        };

        productRepositoryMock.exists.mockResolvedValue(true);

        productRepositoryMock.recoverByUuid.mockResolvedValue(Product.recover(productInputDTO));

        const productOutputDTO: IProduct = await recoverProductByIdUseCase.execute(productInputDTO.id);

        expect(productOutputDTO)
            .toEqual(productInputDTO);

        expect(productRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(productRepositoryMock.recoverByUuid)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Recover A Product That Does Not Exist', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO = {
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        };

        productRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => recoverProductByIdUseCase.execute(productInputDTO.id))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });
});
