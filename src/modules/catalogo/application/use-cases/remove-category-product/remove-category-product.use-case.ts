import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { RecoverProductProps } from "@modules/catalogo/domain/product/product.types"
import { IUseCase } from "@shared/application/use-case.interface"
import { ProductApplicationExceptions } from "../../exceptions/product.application.exception"
import { Category } from "@modules/catalogo/domain/category/category.entity"

export class RemoveCategoryProductUseCase implements IUseCase<RecoverProductProps, boolean> {

    private _productRepository: IProductRepository<Product>

    constructor(repository: IProductRepository<Product>){
        this._productRepository = repository
    }

    async execute(productProps: RecoverProductProps): Promise<boolean> {

        const existsProduct: boolean = await this._productRepository.exists(productProps.id)

        if (!existsProduct) {
            throw new ProductApplicationExceptions.ProductNotFound()
        }

        const product: Product = Product.recover(productProps)

        const category: Category = Category.recover({
            id: "06e7b01d-28d6-423f-91b4-2a21063a2a72",
            name: "Cama"
        })

        const productCategoryRemoved = await this._productRepository.removeCategory(product, category)

        return productCategoryRemoved
    }
}