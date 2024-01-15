import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const InsertCategorySchema = z.object({
    name: z.string().min(3).max(50)
}).strict();

const validInputInsertCategoryMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        InsertCategorySchema.parse(request.body);
        next();
    } catch (error: any) {
        const validationError = fromZodError(error);
        error = new HttpErrors.BadRequestError({message: validationError.message});
        next(error);
    }
}

export { validInputInsertCategoryMiddleware as validInputInsertCategory }
