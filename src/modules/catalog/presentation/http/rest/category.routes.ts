import express from 'express';
import { recoverCategoryByIdController } from './controllers';

export const categoryRouter = express.Router();

categoryRouter.get(
    '/:id',
    (request, response, next) => recoverCategoryByIdController.recover(request, response, next)
);