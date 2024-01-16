import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { RecoverProductsByCategoryUseCase } from "@modules/catalog/application/use-cases/recover-products-by-category/recover-products-by-category.use-case";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class RecoverProductsByCategoryExpressController extends ExpressController {

    private _recoverProductsByCategoryUseCase: RecoverProductsByCategoryUseCase;

    constructor(recoverProductsByCategoryUseCase: RecoverProductsByCategoryUseCase) {
        super();
        this._recoverProductsByCategoryUseCase = recoverProductsByCategoryUseCase;
    }

    async recoverByCategory(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const listProductsDTO: Array<IProduct> = await this._recoverProductsByCategoryUseCase.execute(uuid);
            this.sendSuccessResponse(response,listProductsDTO);
        } catch (error) {
            if (error instanceof CategoryApplicationExceptions.CategoryNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}
