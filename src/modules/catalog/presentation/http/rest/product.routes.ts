import express from "express"
import { addCategoryProductController, alterStatusProductController, deleteProductController, insertProductController, recoverAllProductsController, recoverProductByIdController, recoverProductsByCategoryController, removeCategoryProductController, updateProductController } from "./controllers";
import { contentTypeMiddleware } from "@main/presentation/http/middlewares/content-type.middleware";
import { validInputInsertProduct } from "../middlewares/valid-input-insert-product.middleware";

export const productRouter = express.Router();

productRouter.get(
    '/:id',
    (request, response, next) => recoverProductByIdController.recover(request, response, next)
);

productRouter.get(
    '/',
    (request, response, next) =>  recoverAllProductsController.recover(request, response, next)
);

productRouter.post(
    '/',
    contentTypeMiddleware,
    validInputInsertProduct,
    (request, response, next) =>  insertProductController.insert(request, response, next)
);

productRouter.put(
    '/:id',
    contentTypeMiddleware,
    (request, response, next) => updateProductController.update(request, response, next)
);

productRouter.delete(
    '/:id',
    (request, response, next) => deleteProductController.delete(request, response, next)
);

productRouter.post(
    '/:add-category/:id',
    contentTypeMiddleware,
    (request, response, next) => addCategoryProductController.addCategory(request, response, next)
);

productRouter.delete(
    '/:remove-category/:id',
    contentTypeMiddleware,
    (request, response, next) => removeCategoryProductController.removeCategory(request, response, next)
);

productRouter.get(
    '/:category/:id',
    (request, response, next) => recoverProductsByCategoryController.recoverByCategory(request, response, next)
);

productRouter.put(
    '/:status/:id',
    contentTypeMiddleware,
    (request, response, next) => alterStatusProductController.alterStatus(request, response, next)
);
