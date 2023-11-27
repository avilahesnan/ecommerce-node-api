import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

export class  DeleteProductUseCase implements IUseCase<string, boolean> {
    
    private _productRepository: IProductRepository<Product>;

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository;
    };

    async execute(uuid: string): Promise<boolean> {

        const existsProduct: boolean = await this._productRepository.exists(uuid);

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound();
        };

        const deletedProduct: boolean = await this._productRepository.delete(uuid);

        return deletedProduct;
    };
};