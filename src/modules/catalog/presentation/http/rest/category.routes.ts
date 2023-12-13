import express from 'express';
import { deleteCategoryController, insertCategoryController, recoverAllCategoriesController, recoverCategoryByIdController, updateCategoryController } from './controllers';
import { contentTypeMiddleware } from '@main/presentation/http/middlewares/content-type.middleware';
import { validInputInsertCategory } from '../middlewares/valid-input-insert-category.middleware';

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
    contentTypeMiddleware,
    validInputInsertCategory,
    (request, response, next) =>  insertCategoryController.insert(request, response, next)
);

categoryRouter.put(
    '/:id',
    contentTypeMiddleware,
    (request, response, next) => updateCategoryController.update(request, response, next)
);

categoryRouter.delete(
    '/:id',
    (request, response, next) => deleteCategoryController.delete(request, response, next)
);