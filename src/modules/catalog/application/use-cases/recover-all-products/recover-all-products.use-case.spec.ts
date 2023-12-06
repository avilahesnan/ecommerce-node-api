import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverAllProductsUseCase } from "./recover-all-products.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { ProductMap } from "@modules/catalog/infra/mappers/product.map";
import { IProduct } from "@modules/catalog/domain/product/product.types";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let recoverAllProductsUseCase: RecoverAllProductsUseCase;

describe('Use Case: Recover All Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        recoverAllProductsUseCase = new RecoverAllProductsUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });

    test('Should Recover All Undeleted Products', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const listProducts = [{
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [CategoryMap.toDomain(category)],
            dateDeletion: null
        },{
            id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
            name: "Iphone",
            description: "Um ótimo smartphone",
            value: 3500,
            categories: [CategoryMap.toDomain(category)],
            dateDeletion: null
        }];

        const products: Array<Product> = listProducts.map((product) => ProductMap.toDomain(product));

        productRepositoryMock.recoverAll.mockResolvedValue(products);

        const productsDTO = products.map((product) => ProductMap.toDTO(product));

        const productsOutputDTO: Array<IProduct> = await recoverAllProductsUseCase.execute();

        expect(productsOutputDTO)
            .toStrictEqual(productsDTO);
        
        expect(productRepositoryMock.recoverAll)
            .toHaveBeenCalledTimes(1);
    });
});
