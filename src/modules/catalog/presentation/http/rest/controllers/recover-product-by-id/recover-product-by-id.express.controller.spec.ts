import { RecoverProductByIdUseCase } from "@modules/catalog/application/use-cases/recover-product-by-id/recover-product-by-id.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverProductByIdExpressController } from "./recover-product-by-id.express.controller";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recoverProductByIdUseCaseMock: MockProxy<RecoverProductByIdUseCase>;
let recoverProductByIdController: RecoverProductByIdExpressController;

describe('Controller Express: Recover Product By Id', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recoverProductByIdUseCaseMock = mock<RecoverProductByIdUseCase>();
        recoverProductByIdController = new RecoverProductByIdExpressController(recoverProductByIdUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recoverProductByIdUseCaseMock);
    });

    test('Should Recover A Product By Id', async () => {

        const productInputDTO: IProduct = {
            id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
            name: "Iphone",
            description: "Um ótimo smartphone",
            value: 3500,
            categories: [
                {
                    id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                    name: "Mesa",
                }
            ]
        };

        requestMock.params.id = productInputDTO.id as string;

        recoverProductByIdUseCaseMock.execute.mockResolvedValue(productInputDTO);

        responseMock.status.mockReturnThis();

        await recoverProductByIdController.recover(requestMock, responseMock, nextMock);

        expect(recoverProductByIdUseCaseMock.execute)
            .toHaveBeenLastCalledWith(productInputDTO.id);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(productInputDTO);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });

    test('Should Handle A Product Not Found Exception', async () => {

        const productInputDTO: IProduct = {
            id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
            name: "Iphone",
            description: "Um ótimo smartphone",
            value: 3500,
            categories: [
                {
                    id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                    name: "Mesa",
                }
            ]
        };

        requestMock.params.id = productInputDTO.id as string;

        recoverProductByIdUseCaseMock.execute.mockRejectedValue(new ProductApplicationExceptions.ProductNotFound());

        responseMock.status.mockReturnThis();

        await recoverProductByIdController.recover(requestMock, responseMock, nextMock);

        expect(recoverProductByIdUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO.id);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});
