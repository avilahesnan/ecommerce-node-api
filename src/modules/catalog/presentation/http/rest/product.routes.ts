import express from "express"
import { addCategoryProductController, alterStatusProductController, deleteProductController, insertProductController, recoverAllProductsController, recoverProductByIdController, recoverProductsByCategoryController, removeCategoryProductController, updateProductController } from "./controllers";
import { contentTypeMiddleware } from "@main/presentation/http/middlewares/content-type.middleware";
import { validInputInsertProduct } from "../middlewares/valid-input-insert-product.middleware";
import { validInputUpdateProduct } from "../middlewares/valid-input-update-product.middleware";
import { authUser } from "@main/presentation/http/middlewares/auth-user.middleware";

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
    authUser(['ADM']),
    contentTypeMiddleware,
    validInputInsertProduct,
    (request, response, next) =>  insertProductController.insert(request, response, next)
);

productRouter.put(
    '/:id',
    authUser(['ADM']),
    contentTypeMiddleware,
    validInputUpdateProduct,
    (request, response, next) => updateProductController.update(request, response, next)
);

productRouter.delete(
    '/:id',
    authUser(['ADM']),
    (request, response, next) => deleteProductController.delete(request, response, next)
);

productRouter.post(
    '/:add-category/:id',
    authUser(['ADM']),
    contentTypeMiddleware,
    (request, response, next) => addCategoryProductController.addCategory(request, response, next)
);

productRouter.delete(
    '/:remove-category/:id',
    authUser(['ADM']),
    contentTypeMiddleware,
    (request, response, next) => removeCategoryProductController.removeCategory(request, response, next)
);

productRouter.get(
    '/:category/:id',
    (request, response, next) => recoverProductsByCategoryController.recoverByCategory(request, response, next)
);

productRouter.put(
    '/:id/status',
    authUser(['ADM']),
    contentTypeMiddleware,
    (request, response, next) => alterStatusProductController.alterStatus(request, response, next)
);
