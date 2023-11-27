import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

export class UpdateProductUseCase implements IUseCase<RecoverProductProps, boolean> {

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

        const updatedProduct = await this._productRepository.update(product.id, product);

        return updatedProduct;
    };
};