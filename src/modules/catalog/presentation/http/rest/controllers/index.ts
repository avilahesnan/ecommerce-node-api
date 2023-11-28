import { recoverCategoryByIdUseCase } from "@modules/catalog/application/use-cases";
import { RecoverCategoryByIdExpressController } from "./recover-category-by-id.express.controller";

export const recoverCategoryByIdController = new RecoverCategoryByIdExpressController(recoverCategoryByIdUseCase);