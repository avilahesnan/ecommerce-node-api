import express, { Router } from "express";

export const apiV1Router: Router = express.Router();

apiV1Router.use(
    '/categories',
    function (request, response, next) {
        response.json({"entity":"Categories"});
    }
);

apiV1Router.use(
    '/products',
    function (request, response, next) {
        response.json({"entity":"Products"});
    }  
);

apiV1Router.use(
    '/users',
    function (request, response, next) {
        response.json({"entity":"Users"});
    }  
);

apiV1Router.use(
    '/ordereds',
    function (request, response, next) {
        response.json({"entity":"Ordereds"});
    }  
);