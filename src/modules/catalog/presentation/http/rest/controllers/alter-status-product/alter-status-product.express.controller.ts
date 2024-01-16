import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { AlterStatusProductUseCase } from "@modules/catalog/application/use-cases/alter-status-product/alter-status-product.use-case";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

export class AlterStatusProductExpressController extends ExpressController {

    private _alterStatusProductUseCase: AlterStatusProductUseCase;

    constructor(alterStatusProductUseCase: AlterStatusProductUseCase) {
        super();
        this._alterStatusProductUseCase = alterStatusProductUseCase;
    }

    async alterStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const productInputDTO: RecoverProductProps = request.body as RecoverProductProps;
            const productUpdated: boolean = await this._alterStatusProductUseCase.execute(productInputDTO);
            this.sendSuccessResponse(response, productUpdated);
        } catch (error) {
            if (error instanceof ProductApplicationExceptions.ProductNotFound) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}
