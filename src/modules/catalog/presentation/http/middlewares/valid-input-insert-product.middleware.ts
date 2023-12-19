import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const CategorySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(50)
}).strict();

const InsertProductSchema = z.object({
    name: z.string().min(5).max(50),
    description: z.string().min(10).max(200),
    value: z.number().min(0),
    categories: z.array(CategorySchema).min(1).max(3)
}).strict();

const validInputInsertProductMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        InsertProductSchema.parse(request.body);
        next();
    } catch (error) {
        next(error);
    }
}

export { validInputInsertProductMiddleware as validInputInsertProduct }