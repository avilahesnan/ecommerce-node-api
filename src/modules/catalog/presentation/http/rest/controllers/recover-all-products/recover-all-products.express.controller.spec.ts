import { RecoverAllProductsUseCase } from "@modules/catalog/application/use-cases/recover-all-products/recover-all-products.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverAllProductsExpressController } from "./recover-all-products.express.controller";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recoverAllProductsUseCaseMock: MockProxy<RecoverAllProductsUseCase>;
let recoverAllProductsController: RecoverAllProductsExpressController;

describe('Controller Express: Recover All Products', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recoverAllProductsUseCaseMock = mock<RecoverAllProductsUseCase>();
        recoverAllProductsController = new RecoverAllProductsExpressController(recoverAllProductsUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recoverAllProductsUseCaseMock);
    });

    test('Should Recover All Undeleted Products', async () => {

        const listProducts = [{
            id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
            name: "Iphone",
            description: "Um ótimo smartphone",
            value: 3500,
            categories: [
                {
                    id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                    name: "Mesa",
                }
            ],
            dateDeletion: null,
        }, {
            id: "e64f2358-a053-4ee2-8fbb-47d691036ad8",
            name: "Uma mesa",
            description: "Uma mesa muito grande",
            value: 500,
            categories: [
                {
                    id: "06e7b01d-28d6-423f-91b4-2a21063a2a72",
                    name: "Betão",
                }
            ],
            dateDeletion: null,
        }];

        requestMock.body = listProducts;

        recoverAllProductsUseCaseMock.execute.mockResolvedValue(listProducts);

        responseMock.status.mockReturnThis();

        await recoverAllProductsController.recover(requestMock, responseMock, nextMock);

        expect(recoverAllProductsUseCaseMock.execute)
            .toHaveBeenCalledWith();

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(listProducts);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });
});