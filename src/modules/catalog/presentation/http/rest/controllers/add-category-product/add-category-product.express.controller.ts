import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { AddCategoryProductUseCase } from "@modules/catalog/application/use-cases/add-category-product/add-category-product.use-case";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class AddCategoryProductExpressController extends ExpressController {

    private _addCategoryProductUseCase: AddCategoryProductUseCase;

    constructor(addCategoryProductUseCase: AddCategoryProductUseCase) {
        super();
        this._addCategoryProductUseCase = addCategoryProductUseCase;
    }

    async addCategoryProduct(request: Request, response: Response, next: NextFunction) {
        try {
            const productInputDTO: RecoverProductProps = request.body as RecoverProductProps;
            const categoryProductAdded: boolean = await this._addCategoryProductUseCase.execute(productInputDTO);
            this.sendSuccessResponse(response, categoryProductAdded); 
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