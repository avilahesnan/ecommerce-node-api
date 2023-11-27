import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { ProductMap } from "@modules/catalog/infra/mappers/product.map";
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception";

export class RecoverProductByIdUseCase implements IUseCase<string, IProduct> {
    
    private _productRepository: IProductRepository<Product>;

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository;
    };
    
    async execute(uuid: string): Promise<IProduct> {
        
        const existsProduct: boolean = await this._productRepository.exists(uuid);

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound();
        };

        const product = await this._productRepository.recoverByUuid(uuid);

        return ProductMap.toDTO(product as Product);
    };
};