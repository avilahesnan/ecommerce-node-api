import { RecoverAllCategoriesUseCase } from "@modules/catalog/application/use-cases/recover-all-categories/recover-all-categories.use-case";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

export class RecoverAllCategoriesExpressController extends ExpressController {

    private _recoverAllCategoriesUseCase: RecoverAllCategoriesUseCase;

    constructor(recoverAllCategoriesUseCase: RecoverAllCategoriesUseCase) {
        super();
        this._recoverAllCategoriesUseCase = recoverAllCategoriesUseCase;
    }

    async recover(request: Request, response: Response, next: NextFunction) {
        try {
            const listCategoriesDTO: Array<ICategory> = await this._recoverAllCategoriesUseCase.execute();
            this.sendSuccessResponse(response,listCategoriesDTO);
        } catch (error) {
            next(error);
        }
    }
}