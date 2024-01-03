import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { RemoveCategoryProductUseCase } from "@modules/catalog/application/use-cases/remove-category-product/remove-category-product.use-case";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class RemoveCategoryProductExpressController extends ExpressController {

    private _removeCategoryProductUseCase: RemoveCategoryProductUseCase;

    constructor(removeCategoryProductUseCase: RemoveCategoryProductUseCase) {
        super();
        this._removeCategoryProductUseCase = removeCategoryProductUseCase;
    }

    async removeCategoryProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const productInputDTO: RecoverProductProps = request.body as RecoverProductProps;
            const categoryProductRemoved: boolean = await this._removeCategoryProductUseCase.execute(productInputDTO);
            this.sendSuccessResponse(response, categoryProductRemoved); 
        } catch (error) {
            if (error instanceof CategoryApplicationExceptions.CategoryNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            if (error instanceof ProductApplicationExceptions.ProductNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}