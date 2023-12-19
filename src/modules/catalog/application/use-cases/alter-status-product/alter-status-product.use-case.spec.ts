import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { AlterStatusProductUseCase } from "./alter-status-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { RecoverProductProps, StatusProduct } from "@modules/catalog/domain/product/product.types";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let alterStatusProductUseCase: AlterStatusProductUseCase;

describe('Use Case: Alter Status Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        alterStatusProductUseCase = new AlterStatusProductUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });

    test('Should Alter Status A Product', async () => {

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

        productRepositoryMock.alterStatus.mockResolvedValue(true);

        const productOutputDTO: boolean = await alterStatusProductUseCase.execute(productInputDTO);

        expect(productOutputDTO)
            .toBeTruthy();

        expect(productRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);

        expect(productRepositoryMock.alterStatus)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Alter Status A Product That Does Not Exist', async () => {
   
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

        await expect(() => alterStatusProductUseCase.execute(productInputDTO))
            .rejects
            .toThrowError(ProductApplicationExceptions.ProductNotFound);
    });
});