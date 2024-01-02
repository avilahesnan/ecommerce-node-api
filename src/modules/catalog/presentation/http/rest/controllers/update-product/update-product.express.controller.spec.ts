import { UpdateProductUseCase } from "@modules/catalog/application/use-cases/update-product/update-product.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { UpdateProductExpressController } from "./update-product.express.controller";
import { RecoverProductProps } from "@modules/catalog/domain/product/product.types";
import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let updateProductUseCaseMock: MockProxy<UpdateProductUseCase>;
let updateProductController: UpdateProductExpressController;

describe('Controller Express: Update Product', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        updateProductUseCaseMock = mock<UpdateProductUseCase>();
        updateProductController = new UpdateProductExpressController(updateProductUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(updateProductUseCaseMock);
    });

    test('Should Update A Product', async () => {

        const productInputDTO: RecoverProductProps = {
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

        requestMock.body = productInputDTO;

        updateProductUseCaseMock.execute.mockResolvedValue(true);

        responseMock.status.mockReturnThis();

        await updateProductController.update(requestMock, responseMock, nextMock);

        expect(updateProductUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(true);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });

    test('Should Handle A Product Not Found Exception', async () => {

        const productInputDTO: RecoverProductProps = {
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

        requestMock.body = productInputDTO;

        updateProductUseCaseMock.execute.mockRejectedValue(new ProductApplicationExceptions.ProductNotFound());

        responseMock.status.mockReturnThis();

        await updateProductController.update(requestMock, responseMock, nextMock);

        expect(updateProductUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});