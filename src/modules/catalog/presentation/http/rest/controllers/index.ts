import { deleteCategoryUseCase, insertCategoryUseCase, recoverAllCategoriesUseCase, recoverAllProductsUseCase, recoverCategoryByIdUseCase, updateCategoryUseCase } from "@modules/catalog/application/use-cases";
import { RecoverAllCategoriesExpressController } from "./recover-all-categories/recover-all-categories.express.controller";
import { InsertCategoryExpressController } from "./insert-category/insert-category.express.controller";
import { UpdateCategoryExpressController } from "./update-category/update-category.express.controller";
import { DeleteCategoryExpressController } from "./delete-category/delete-category.express.controller";
import { RecoverCategoryByIdExpressController } from "./recover-category-by-id/recover-category-by-id.express.controller";
import { RecoverAllProductsExpressController } from "./recover-all-products/recover-all-products.express.controller";

export const recoverCategoryByIdController = new RecoverCategoryByIdExpressController(recoverCategoryByIdUseCase);
export const recoverAllCategoriesController = new RecoverAllCategoriesExpressController(recoverAllCategoriesUseCase);
export const insertCategoryController = new InsertCategoryExpressController(insertCategoryUseCase);
export const updateCategoryController = new UpdateCategoryExpressController(updateCategoryUseCase);
export const deleteCategoryController = new DeleteCategoryExpressController(deleteCategoryUseCase);

export const recoverAllProductsController = new RecoverAllProductsExpressController(recoverAllProductsUseCase);