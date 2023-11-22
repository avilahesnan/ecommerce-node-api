import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { CreateProductProps, IProduct } from "@modules/catalogo/domain/product/product.types"
import { ProductMap } from "@modules/catalogo/infra/mappers/product.map"
import { IUseCase } from "@shared/application/use-case.interface"

export class InsertProductUseCase implements IUseCase<CreateProductProps, IProduct> {

    private _productRepository: IProductRepository<Product>

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository
    }

    async execute(productProps: CreateProductProps): Promise<IProduct> {

        const product: Product = Product.create(productProps)

        const productInserted = await this._productRepository.insert(product)

        return ProductMap.toDTO(productInserted)
    }
}