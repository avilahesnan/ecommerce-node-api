import { categoryRouter } from "@modules/catalog/presentation/http/rest/category.routes";
import { productRouter } from "@modules/catalog/presentation/http/rest/product.routes";
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
    function (request, response, next) {
        response.json({"entity":"Users"});
    }  
);

apiV1Router.use(
    '/orders',
    function (request, response, next) {
        response.json({"entity":"Orders"});
    }  
);