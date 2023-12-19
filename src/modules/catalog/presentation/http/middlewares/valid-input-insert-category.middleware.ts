import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const InsertCategorySchema = z.object({
    name: z.string().min(3).max(50)
}).strict();

const validInputInsertCategoryMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        InsertCategorySchema.parse(request.body);
        next();
    } catch (error) {
        next(error);
    }
}

export { validInputInsertCategoryMiddleware as validInputInsertCategory }