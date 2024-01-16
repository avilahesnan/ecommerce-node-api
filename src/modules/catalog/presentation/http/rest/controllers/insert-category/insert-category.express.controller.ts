import { InsertCategoryUseCase } from "@modules/catalog/application/use-cases/insert-category/insert-category.use-case";
import { CreateCategoryProps, ICategory } from "@modules/catalog/domain/category/category.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

export class InsertCategoryExpressController extends ExpressController {

    private _insertCategoryUseCase: InsertCategoryUseCase;

    constructor(insertCategoryUseCase: InsertCategoryUseCase) {
      super();
      this._insertCategoryUseCase = insertCategoryUseCase;
    }

    async insert(request: Request, response: Response, next: NextFunction) {
        try {
            const categoryInputDTO: CreateCategoryProps = request.body;
            const categoryOutputDTO: ICategory = await this._insertCategoryUseCase.execute(categoryInputDTO);
            this.sendSuccessResponse(response,categoryOutputDTO);
        } catch (error) {
            next(error);
        }
    } 
}
