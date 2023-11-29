import { insertCategoryUseCase, recoverAllCategoriesUseCase, recoverCategoryByIdUseCase } from "@modules/catalog/application/use-cases";
import { RecoverCategoryByIdExpressController } from "./recover-category-by-id.express.controller";
import { RecoverAllCategoriesExpressController } from "./recover-all-categories.express.controller";
import { InsertCategoryExpressController } from "./insert-category.express.controller";

export const recoverCategoryByIdController = new RecoverCategoryByIdExpressController(recoverCategoryByIdUseCase);
export const recoverAllCategoriesController = new RecoverAllCategoriesExpressController(recoverAllCategoriesUseCase);
export const insertCategoryController = new InsertCategoryExpressController(insertCategoryUseCase);