import express from "express"
import { recoverAllProductsController, recoverProductByIdController } from "./controllers";

export const productRouter = express.Router();

productRouter.get(
    '/:id',
    (request, response, next) => recoverProductByIdController.recover(request, response, next)
);

productRouter.get(
    '/',
    (request, response, next) =>  recoverAllProductsController.recover(request, response, next)
);