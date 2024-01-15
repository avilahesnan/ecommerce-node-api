import express from 'express';
import { deleteCategoryController, insertCategoryController, recoverAllCategoriesController, recoverCategoryByIdController, updateCategoryController } from './controllers';
import { contentTypeMiddleware } from '@main/presentation/http/middlewares/content-type.middleware';
import { validInputInsertCategory } from '../middlewares/valid-input-insert-category.middleware';
import { authUser } from '@main/presentation/http/middlewares/auth-user.middleware';
import { validInputUpdateCategory } from '../middlewares/valid-input-update-category.middleware';

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
    authUser(['ADM']),
    contentTypeMiddleware,
    validInputInsertCategory,
    (request, response, next) =>  insertCategoryController.insert(request, response, next)
);

categoryRouter.put(
    '/:id',
    authUser(['ADM']),
    contentTypeMiddleware,
    validInputUpdateCategory,
    (request, response, next) => updateCategoryController.update(request, response, next)
);

categoryRouter.delete(
    '/:id',
    authUser(['ADM']),
    (request, response, next) => deleteCategoryController.delete(request, response, next)
);
