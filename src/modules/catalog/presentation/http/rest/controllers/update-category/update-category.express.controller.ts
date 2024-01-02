import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { UpdateCategoryUseCase } from "@modules/catalog/application/use-cases/update-category/update-category.use-case";
import { RecoverCategoryProps } from "@modules/catalog/domain/category/category.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class UpdateCategoryExpressController extends ExpressController {

    private _updateCategoryUseCase: UpdateCategoryUseCase;

    constructor(updateCategoryUseCase: UpdateCategoryUseCase) {
        super();
        this._updateCategoryUseCase =updateCategoryUseCase;
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const categoryInputDTO: RecoverCategoryProps = request.body as RecoverCategoryProps;
            const categoryUpdated: boolean = await this._updateCategoryUseCase.execute(categoryInputDTO);
            this.sendSuccessResponse(response, categoryUpdated);
        } catch (error) {
            if (error instanceof CategoryApplicationExceptions.CategoryNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}