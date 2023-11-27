import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

export class AddCategoryProductUseCase implements IUseCase<RecoverProductProps, boolean> {
    
    private _productRepository: IProductRepository<Product>;

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository;
    };

    async execute(productProps: RecoverProductProps): Promise<boolean> {

        const existsProduct: boolean = await this._productRepository.exists(productProps.id);

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound();
        };

        const product: Product = Product.recover(productProps);

        const category: Category = Category.recover({
            id: "06e7b01d-28d6-423f-91b4-2a21063a2a72",
            name: "Cama"
        });

        const productCategoryAdded = await this._productRepository.addCategory(product, category);

        return productCategoryAdded;
    };
};