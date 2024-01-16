import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { RecoverCategoryByIdUseCase } from "@modules/catalog/application/use-cases/recover-category-by-id/recover-category-by-id.use-case";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class RecoverCategoryByIdExpressController extends ExpressController {

    private _recoverCategoryByIdUseCase: RecoverCategoryByIdUseCase;
 
    constructor(recoverCategoryByIdUseCase: RecoverCategoryByIdUseCase) {
        super();
        this._recoverCategoryByIdUseCase = recoverCategoryByIdUseCase;
    }

    async recover(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const categoryDTO: ICategory = await this._recoverCategoryByIdUseCase.execute(uuid);
            this.sendSuccessResponse(response, categoryDTO);
        } catch (error) {
            if (error instanceof CategoryApplicationExceptions.CategoryNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    } 
}
