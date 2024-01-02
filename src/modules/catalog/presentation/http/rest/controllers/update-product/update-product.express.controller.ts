import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { UpdateProductUseCase } from "@modules/catalog/application/use-cases/update-product/update-product.use-case";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class UpdateProductExpressController extends ExpressController {

    private _updateProductUseCase: UpdateProductUseCase;

    constructor(updateProductUseCase: UpdateProductUseCase) {
        super();
        this._updateProductUseCase = updateProductUseCase;
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const productInputDTO: RecoverProductProps = request.body as RecoverProductProps;
            const productUpdated: boolean = await this._updateProductUseCase.execute(productInputDTO);
            this.sendSuccessResponse(response, productUpdated);
        } catch (error) {
            if (error instanceof ProductApplicationExceptions.ProductNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}