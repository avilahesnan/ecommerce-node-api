import { InsertProductUseCase } from "@modules/catalog/application/use-cases/insert-product/insert-product.use-case";
import { CreateProductProps, IProduct } from "@modules/catalog/domain/product/product.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

export class InsertProductExpressController extends ExpressController {

    private _insertProductUseCase: InsertProductUseCase;

    constructor(insertProductUseCase: InsertProductUseCase) {
      super();
      this._insertProductUseCase = insertProductUseCase;
    }

    async insert(request: Request, response: Response, next: NextFunction) {
        try {
            const ProductInputDTO: CreateProductProps = request.body;
            const ProductOutputDTO: IProduct = await this._insertProductUseCase.execute(ProductInputDTO);
            this.sendSuccessResponse(response,ProductOutputDTO);
        } catch (error) {
            next(error);
        }
    } 
}