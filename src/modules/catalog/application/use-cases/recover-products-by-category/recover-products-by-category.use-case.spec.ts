import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverProductsByCategoryUseCase } from "./recover-products-by-category.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { ProductMap } from "@modules/catalog/infra/mappers/product.map";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let categoryRepositoryMock: MockProxy<ICategoryRepository<Category>>
let recoverProductsByCategoryUseCase: RecoverProductsByCategoryUseCase;


describe('Use Case: Recover Products By Category', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        categoryRepositoryMock = mock<ICategoryRepository<Category>>();
        recoverProductsByCategoryUseCase = new RecoverProductsByCategoryUseCase(productRepositoryMock, categoryRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
        mockReset(categoryRepositoryMock);
    });

    test('Should Recover Products By Category', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const listProducts = [{
            id: "575dbd2f-1e73-419b-9f66-b08d943b4a5a",
            name: "Almofada",
            description: "Um ótima almofada",
            value: 60,
            categories: [category]
        },{
            id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
            name: "Iphone",
            description: "Um ótimo smartphone",
            value: 3500,
            categories: [category]
        }];

        const products: Array<Product> = listProducts.map((product) => ProductMap.toDomain(product));

        categoryRepositoryMock.exists.mockResolvedValue(true);

        productRepositoryMock.recoverByCategory.mockResolvedValue(products);

        const productsDTO = products.map((product) => ProductMap.toDTO(product));

        const productsOutputDTO: Array<IProduct> = await recoverProductsByCategoryUseCase.execute(category.id);

        expect(productsOutputDTO)
            .toStrictEqual(productsDTO);

        expect(categoryRepositoryMock.exists)
            .toHaveBeenCalledTimes(1);
        
        expect(productRepositoryMock.recoverByCategory)
            .toHaveBeenCalledTimes(1);
    });

    test('Should Throw An Exception When Trying to Recover By A Category That Does Not Exist', async () => {
   
        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        categoryRepositoryMock.exists.mockResolvedValue(false);

        await expect(() => recoverProductsByCategoryUseCase.execute(category.id))
            .rejects
            .toThrowError(CategoryApplicationExceptions.CategoryNotFound);
   });
});
