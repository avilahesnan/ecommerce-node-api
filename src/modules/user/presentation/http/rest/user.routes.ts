import express from 'express';
import { authenticateUserController, registerUserController } from './controllers';

export const userRouter = express.Router();

userRouter.post(
    '/',
    (request, response, next) =>  registerUserController.register(request, response, next)
);

userRouter.post(
    '/authenticate',
    (request, response, next) =>  authenticateUserController.authenticate(request, response, next)
);
