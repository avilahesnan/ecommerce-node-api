import { RecoverCategoryByIdUseCase } from "@modules/catalog/application/use-cases/recover-category-by-id/recover-category-by-id.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverCategoryByIdExpressController } from "./recover-category-by-id.express.controller";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recoverCategoryByIdUseCaseMock: MockProxy<RecoverCategoryByIdUseCase>;
let recoverCategoryByIdController: RecoverCategoryByIdExpressController;

describe('Controller Express: Recover Category By Id', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recoverCategoryByIdUseCaseMock = mock<RecoverCategoryByIdUseCase>();
        recoverCategoryByIdController = new RecoverCategoryByIdExpressController(recoverCategoryByIdUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recoverCategoryByIdUseCaseMock);
    });

    test('Should Recover A Category By Id', async () => {

        const categoryInputDTO: ICategory = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        requestMock.params.id = categoryInputDTO.id as string;

        recoverCategoryByIdUseCaseMock.execute.mockResolvedValue(categoryInputDTO);

        responseMock.status.mockReturnThis();

        await recoverCategoryByIdController.recover(requestMock, responseMock, nextMock);

        expect(recoverCategoryByIdUseCaseMock.execute)
            .toHaveBeenLastCalledWith(categoryInputDTO.id);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(categoryInputDTO);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });

    test('Should Handle A Category Not Found Exception', async () => {

        const categoryInputDTO: ICategory = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        requestMock.params.id = categoryInputDTO.id as string;

        recoverCategoryByIdUseCaseMock.execute.mockRejectedValue(new CategoryApplicationExceptions.CategoryNotFound());

        responseMock.status.mockReturnThis();

        await recoverCategoryByIdController.recover(requestMock, responseMock, nextMock);

        expect(recoverCategoryByIdUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO.id);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});

