import { DeleteProductUseCase } from "@modules/catalog/application/use-cases/delete-product/delete-product.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { DeleteProductExpressController } from "./delete-product.express.controller";
import { ProductApplicationExceptions } from "@modules/catalog/application/exceptions/product.application.exception";
import { IProduct } from "@modules/catalog/domain/product/product.types";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let deleteProductUseCaseMock: MockProxy<DeleteProductUseCase>;
let deleteProductController: DeleteProductExpressController;

describe('Controller Express: Delete Product', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        deleteProductUseCaseMock = mock<DeleteProductUseCase>();
        deleteProductController = new DeleteProductExpressController(deleteProductUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(deleteProductUseCaseMock);
    });

    test('Should Delete A Product', async () => {

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

        deleteProductUseCaseMock.execute.mockResolvedValue(true);

        responseMock.status.mockReturnThis();

        await deleteProductController.delete(requestMock, responseMock, nextMock);

        expect(deleteProductUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO.id);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(true);

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

        deleteProductUseCaseMock.execute.mockRejectedValue(new ProductApplicationExceptions.ProductNotFound());

        responseMock.status.mockReturnThis();

        await deleteProductController.delete(requestMock, responseMock, nextMock);

        expect(deleteProductUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO.id);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});
