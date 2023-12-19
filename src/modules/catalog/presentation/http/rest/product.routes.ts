import express from "express"
import { recoverAllProductsController } from "./controllers";

export const productRouter = express.Router();

productRouter.get(
    '/',
    (request, response, next) =>  recoverAllProductsController.recover(request, response, next)
);