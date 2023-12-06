import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { InsertProductUseCase } from "./insert-product.use-case";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CreateProductProps, IProduct } from "@modules/catalog/domain/product/product.types";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { Category } from "@modules/catalog/domain/category/category.entity";

let productRepositoryMock: MockProxy<IProductRepository<Product>>;
let insertProductUseCase: InsertProductUseCase;

describe('Use Case: Insert Product', () => {

    beforeAll(async () => {
        productRepositoryMock = mock<IProductRepository<Product>>();
        insertProductUseCase = new InsertProductUseCase(productRepositoryMock);
    });

    afterEach(async () => {
        vi.resetAllMocks();
        mockReset(productRepositoryMock);
    });

    test('Should Insert A Product', async () => {

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        const productInputDTO: CreateProductProps = {
            name: 'Mesa grande',
            description: 'Uma mesa muito grande',
            value: 200,
            categories: [CategoryMap.toDomain(category)]  
        };

        const product: Product = Product.create(productInputDTO);

        productRepositoryMock.insert.mockResolvedValue(product);

        const productOutputDTO: IProduct = await insertProductUseCase.execute(product);

        expect(productOutputDTO)
            .toBeDefined();

        expect(productOutputDTO)
            .toMatchObject(
                expect.objectContaining({
                    id:expect.any(String),
                    name:expect.any(String),
                    description:expect.any(String),
                    value:expect.any(Number),
                    categories:expect.any(Array<Category>)
                })
            );
        
        expect(productRepositoryMock.insert)
            .toHaveBeenCalledTimes(1);
    });
});