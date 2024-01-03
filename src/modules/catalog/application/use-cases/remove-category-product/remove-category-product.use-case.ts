import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";

export class RemoveCategoryProductUseCase implements IUseCase<RecoverProductProps, boolean> {

    private _productRepository: IProductRepository<Product>;
    private _categoryRepository: ICategoryRepository<Category>;

    constructor(repositoryProduct: IProductRepository<Product>, repositoryCategory: ICategoryRepository<Category>){
        this._productRepository = repositoryProduct;
        this._categoryRepository = repositoryCategory;
    }

    async execute(productProps: RecoverProductProps): Promise<boolean> {

        const existsProduct: boolean = await this._productRepository.exists(productProps.id);

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound();
        }

        const category: Category = Category.recover({
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesacasa"
        });

        const existsCategory: boolean = await this._categoryRepository.exists(category.id);

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound();
        }

        const product: Product = Product.recover(productProps);

        const productCategoryRemoved: boolean = await this._productRepository.removeCategory(product, category);

        return productCategoryRemoved;
    }
}