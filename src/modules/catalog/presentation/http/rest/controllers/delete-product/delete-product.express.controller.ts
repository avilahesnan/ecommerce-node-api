import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { DeleteProductUseCase } from "@modules/catalog/application/use-cases/delete-product/delete-product.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class DeleteProductExpressController extends ExpressController {

    private _deleteProductUseCase: DeleteProductUseCase;

    constructor(deleteProductUseCase: DeleteProductUseCase) {
        super();
        this._deleteProductUseCase = deleteProductUseCase;
    }
    
    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid: string = request.params.id;
            const productDeleted: boolean = await this._deleteProductUseCase.execute(uuid);
            this.sendSuccessResponse(response, productDeleted);
        } catch (error) {
            if (error instanceof ProductApplicationExceptions.ProductNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}