import { RecoverAllCategoriesUseCase } from "@modules/catalog/application/use-cases/recover-all-categories/recover-all-categories.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverAllCategoriesExpressController } from "./recover-all-categories.express.controller";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recoverAllCategoriesUseCaseMock: MockProxy<RecoverAllCategoriesUseCase>;
let recoverAllCategoriesController: RecoverAllCategoriesExpressController;

describe('Controller Express: Recover All Categories', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recoverAllCategoriesUseCaseMock = mock<RecoverAllCategoriesUseCase>();
        recoverAllCategoriesController = new RecoverAllCategoriesExpressController(recoverAllCategoriesUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recoverAllCategoriesUseCaseMock);
    });

    test('Should Recover All Categories Without Exception', async () => {

        const listCategories = [{
            id: "06e7b01d-28d6-423f-91b4-2a21063a2a72",
            name: "Cama"
        },{
            id: "bb97a1e8-d09f-462f-b8e6-acb2e31af92c",
            name: "Sala de Estar"
        }];

        requestMock.body = listCategories;

        recoverAllCategoriesUseCaseMock.execute.mockResolvedValue(listCategories);

        responseMock.status.mockReturnThis();

        await recoverAllCategoriesController.recover(requestMock, responseMock, nextMock);

        expect(recoverAllCategoriesUseCaseMock.execute)
            .toHaveBeenCalledWith();

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(listCategories);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });
});
