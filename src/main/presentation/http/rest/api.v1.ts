import { categoryRouter } from "@modules/catalog/presentation/http/rest/category.routes";
import { productRouter } from "@modules/catalog/presentation/http/rest/product.routes";
import { userRouter } from "@modules/user/presentation/http/rest/user.routes";
import express, { Router } from "express";

export const apiV1Router: Router = express.Router();

apiV1Router.use(
    '/categories',
    categoryRouter
);

apiV1Router.use(
    '/products',
    productRouter 
);

apiV1Router.use(
    '/users',
    userRouter
);

apiV1Router.use(
    '/orders',
    function (request, response, next) {
        response.json({"entity":"Orders"});
    }  
);
