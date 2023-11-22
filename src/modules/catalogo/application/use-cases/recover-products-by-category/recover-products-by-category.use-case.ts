import { Category } from "@modules/catalogo/domain/category/category.entity"
import { ICategoryRepository } from "@modules/catalogo/domain/category/category.repository.interface"
import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { IProduct } from "@modules/catalogo/domain/product/product.types"
import { IUseCase } from "@shared/application/use-case.interface"
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception"
import { ProductMap } from "@modules/catalogo/infra/mappers/product.map"

export class RecoverProductsByCategory implements IUseCase<string, Array<IProduct>> {
    
    private _productRepository: IProductRepository<Product>
    private _categoryRepository: ICategoryRepository<Category>

    constructor(
        repositoryProduct: IProductRepository<Product>, repositoryCategory: ICategoryRepository<Category>
    ) {
        this._productRepository = repositoryProduct,
        this._categoryRepository = repositoryCategory
    }

    async execute(uuidCategory: string): Promise<IProduct[]> {

        const existsCategory: boolean = await this._categoryRepository.exists(uuidCategory)

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound()
        } 

        const allProducts: Array<Product> = await this._productRepository.recoverByCategory(uuidCategory)

        const allProductsDTO = allProducts.map((product) => ProductMap.toDTO(product))

        return allProductsDTO
    }
}