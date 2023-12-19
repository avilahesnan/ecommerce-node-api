import { RecoverAllProductsUseCase } from "@modules/catalog/application/use-cases/recover-all-products/recover-all-products.use-case";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

export class RecoverAllProductsExpressController extends ExpressController {

    private _recoverAllProductsUseCase: RecoverAllProductsUseCase;

    constructor(recoverAllProductsUseCase: RecoverAllProductsUseCase) {
        super();
        this._recoverAllProductsUseCase = recoverAllProductsUseCase;
    }

    async recover(request: Request, response: Response, next: NextFunction) {
        try {
            const listProductsDTO: Array<IProduct> = await this._recoverAllProductsUseCase.execute();
            this.sendSuccessResponse(response,listProductsDTO);
        } catch (error) {
            next(error);
        }
    }
}