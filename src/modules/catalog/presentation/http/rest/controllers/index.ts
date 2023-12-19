import { deleteCategoryUseCase, deleteProductUseCase, insertCategoryUseCase, insertProductUseCase, recoverAllCategoriesUseCase, recoverAllProductsUseCase, recoverCategoryByIdUseCase, recoverProductByIdUseCase, updateCategoryUseCase, updateProductUseCase } from "@modules/catalog/application/use-cases";
import { RecoverAllCategoriesExpressController } from "./recover-all-categories/recover-all-categories.express.controller";
import { InsertCategoryExpressController } from "./insert-category/insert-category.express.controller";
import { UpdateCategoryExpressController } from "./update-category/update-category.express.controller";
import { DeleteCategoryExpressController } from "./delete-category/delete-category.express.controller";
import { RecoverCategoryByIdExpressController } from "./recover-category-by-id/recover-category-by-id.express.controller";
import { RecoverAllProductsExpressController } from "./recover-all-products/recover-all-products.express.controller";
import { RecoverProductByIdExpressController } from "./recover-product-by-id/recover-product-by-id.express.controller";
import { InsertProductExpressController } from "./insert-product/insert-product.express.controller";
import { UpdateProductExpressController } from "./update-product/update-product.express.controller";
import { DeleteProductExpressController } from "./delete-product/delete-product.express.controller";

export const recoverCategoryByIdController = new RecoverCategoryByIdExpressController(recoverCategoryByIdUseCase);
export const recoverAllCategoriesController = new RecoverAllCategoriesExpressController(recoverAllCategoriesUseCase);
export const insertCategoryController = new InsertCategoryExpressController(insertCategoryUseCase);
export const updateCategoryController = new UpdateCategoryExpressController(updateCategoryUseCase);
export const deleteCategoryController = new DeleteCategoryExpressController(deleteCategoryUseCase);

export const recoverProductByIdController = new RecoverProductByIdExpressController(recoverProductByIdUseCase);
export const recoverAllProductsController = new RecoverAllProductsExpressController(recoverAllProductsUseCase);
export const insertProductController = new InsertProductExpressController(insertProductUseCase);
export const updateProductController = new UpdateProductExpressController(updateProductUseCase);
export const deleteProductController = new DeleteProductExpressController(deleteProductUseCase);