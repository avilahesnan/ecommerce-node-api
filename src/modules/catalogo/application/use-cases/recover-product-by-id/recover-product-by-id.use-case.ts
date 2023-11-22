import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { IProduct } from "@modules/catalogo/domain/product/product.types"
import { IUseCase } from "@shared/application/use-case.interface"
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception"
import { ProductMap } from "@modules/catalogo/infra/mappers/product.map"

export class RecoverProductByIdUseCase implements IUseCase<string, IProduct> {
    
    private _productRepository: IProductRepository<Product>

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository
    }
    
    async execute(uuid: string): Promise<IProduct> {
        
        const existsProduct: boolean = await this._productRepository.exists(uuid)

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound()
        }

        const product = await this._productRepository.recoverByUuid(uuid)

        return ProductMap.toDTO(product as Product)
    }
}