import express from 'express';
import { insertCategoryController, recoverAllCategoriesController, recoverCategoryByIdController } from './controllers';

export const categoryRouter = express.Router();

categoryRouter.get(
    '/:id',
    (request, response, next) => recoverCategoryByIdController.recover(request, response, next)
);

categoryRouter.get(
    '/',
    (request, response, next) =>  recoverAllCategoriesController.recover(request, response, next)
);

categoryRouter.post(
    '/',
    (request, response, next) =>  insertCategoryController.insert(request, response, next)
);