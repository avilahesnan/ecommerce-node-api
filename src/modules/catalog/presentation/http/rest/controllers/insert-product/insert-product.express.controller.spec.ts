import { InsertProductUseCase } from "@modules/catalog/application/use-cases/insert-product/insert-product.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { InsertProductExpressController } from "./insert-product.express.controller";
import { CreateProductProps } from "@modules/catalog/domain/product/product.types";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let insertProductUseCaseMock: MockProxy<InsertProductUseCase>;
let insertProductController: InsertProductExpressController;

describe('Controller Express: Insert Product', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        insertProductUseCaseMock = mock<InsertProductUseCase>();
        insertProductController = new InsertProductExpressController(insertProductUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(insertProductUseCaseMock);
    });

    test('Should Insert A Product', async () => {

        const productInputDTO: CreateProductProps = {
            name: "Iphone 2",
            description: "Um ótimo smartphone",
            value: 3800,
            categories: [
                {
                    id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                    name: "Mesa",
                }
            ]
        };

        requestMock.body = productInputDTO;

        insertProductUseCaseMock.execute.mockResolvedValue(productInputDTO);

        responseMock.status.mockReturnThis();

        await insertProductController.insert(requestMock, responseMock, nextMock);

        expect(insertProductUseCaseMock.execute)
            .toHaveBeenCalledWith(productInputDTO);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(productInputDTO);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });
});
