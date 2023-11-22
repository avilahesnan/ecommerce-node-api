import { categoryRepository, productRepository } from "@modules/catalogo/infra/database"
import { RecoverCategoryByIdUseCase } from "./recover-category-by-id/recover-category-by-id.use-case"
import { RecoverAllCategoriesUseCase } from "./recover-all-categories/recover-all-categories.use-case"
import { InsertCategoryUseCase } from "./insert-category/insert-category.use-case"
import { UpdateCategoryUseCase } from "./update-category/update-category.use-case"
import { DeleteCategoryUseCase } from "./delete-category/delete-category.use-case"
import { RecoverProductByIdUseCase } from "./recover-product-by-id/recover-product-by-id.use-case"
import { RecoverAllProductsUseCase } from "./recover-all-products/recover-all-products.use-case"
import { InsertProductUseCase } from "./insert-product/insert-product.use-case"
import { UpdateProductUseCase } from "./update-product/update-product.use-case"
import { DeleteProductUseCase } from "./delete-product/delete-product.use-case"
import { AlterStatusProductUseCase } from "./alter-status-product/alter-status-product.use-case"
import { AddCategoryProductUseCase } from "./add-category-product/add-category-product.use-case"
import { RemoveCategoryProductUseCase } from "./remove-category-product/remove-category-product.use-case"
import { RecoverProductsByCategory } from "./recover-products-by-category/recover-products-by-category.use-case"

export const recoverCategoryByIdUseCase = new RecoverCategoryByIdUseCase(categoryRepository)
export const recoverAllCategoriesUseCase = new RecoverAllCategoriesUseCase(categoryRepository)
export const insertCategoryUseCase = new InsertCategoryUseCase(categoryRepository)
export const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
export const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

export const recoverProductByIdUseCase = new RecoverProductByIdUseCase(productRepository)
export const recoverAllProductsUseCase = new RecoverAllProductsUseCase(productRepository)
export const insertProductUseCase = new InsertProductUseCase(productRepository)
export const updateProductUseCase = new UpdateProductUseCase(productRepository)
export const deleteProductUseCase = new DeleteProductUseCase(productRepository)
export const addCategoryProductUseCase = new AddCategoryProductUseCase(productRepository)
export const removeCategoryProductUseCase = new RemoveCategoryProductUseCase(productRepository)
export const alterStatusProductUseCase = new AlterStatusProductUseCase(productRepository)
export const recoverProductsByCategoryUseCase = new RecoverProductsByCategory(productRepository, categoryRepository)