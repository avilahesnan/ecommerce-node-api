import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { IProduct } from "@modules/catalogo/domain/product/product.types"
import { ProductMap } from "@modules/catalogo/infra/mappers/product.map"
import { IUseCase } from "@shared/application/use-case.interface"

export class RecoverAllProductsUseCase implements IUseCase<void, Array<IProduct>> {

    private _productRepository: IProductRepository<Product>

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository
    }

    async execute(): Promise<IProduct[]> {
        
        const allProducts: Array<Product> = await this._productRepository.recoverAll()

        const allProductsDTO = allProducts.map((product) => ProductMap.toDTO(product))

        return allProductsDTO
    }
}