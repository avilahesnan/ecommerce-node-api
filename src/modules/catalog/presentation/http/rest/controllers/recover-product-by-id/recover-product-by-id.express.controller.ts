import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { RecoverProductByIdUseCase } from "@modules/catalog/application/use-cases/recover-product-by-id/recover-product-by-id.use-case";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class RecoverProductByIdExpressController extends ExpressController {

    private _recoverProductByIdUseCase: RecoverProductByIdUseCase;
 
    constructor(recoverProductByIdUseCase: RecoverProductByIdUseCase) {
        super();
        this._recoverProductByIdUseCase = recoverProductByIdUseCase;
    }

    async recover(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const ProductDTO: IProduct = await this._recoverProductByIdUseCase.execute(uuid);
            this.sendSuccessResponse(response, ProductDTO);
        } catch (error) {
            if (error instanceof ProductApplicationExceptions.ProductNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    } 
}