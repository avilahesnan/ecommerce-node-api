import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProductMap } from "@modules/catalog/infra/mappers/product.map";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

export class RecoverProductsByCategory implements IUseCase<string, Array<IProduct>> {
    
    private _productRepository: IProductRepository<Product>;
    private _categoryRepository: ICategoryRepository<Category>;

    constructor(
        repositoryProduct: IProductRepository<Product>, repositoryCategory: ICategoryRepository<Category>
    ) {
        this._productRepository = repositoryProduct;
        this._categoryRepository = repositoryCategory;
    };

    async execute(uuidCategory: string): Promise<IProduct[]> {

        const existsCategory: boolean = await this._categoryRepository.exists(uuidCategory);

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound();
        };

        const allProducts: Array<Product> = await this._productRepository.recoverByCategory(uuidCategory);

        const allProductsDTO = allProducts.map((product) => ProductMap.toDTO(product));

        return allProductsDTO;
    };
};