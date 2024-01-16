import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { DeleteCategoryUseCase } from "@modules/catalog/application/use-cases/delete-category/delete-category.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class DeleteCategoryExpressController extends ExpressController {

    private _deleteCategoryUseCase: DeleteCategoryUseCase;

    constructor(deleteCategoryUseCase: DeleteCategoryUseCase) {
        super();
        this._deleteCategoryUseCase = deleteCategoryUseCase;
    }
    
    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid: string = request.params.id;
            const categoryDeleted: boolean = await this._deleteCategoryUseCase.execute(uuid);
            this.sendSuccessResponse(response, categoryDeleted);
        } catch (error) {
            if (error instanceof CategoryApplicationExceptions.CategoryNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}
