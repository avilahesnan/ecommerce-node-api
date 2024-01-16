import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { UpdateCategoryExpressController } from "./update-category.express.controller";
import { UpdateCategoryUseCase } from "@modules/catalog/application/use-cases/update-category/update-category.use-case";
import { RecoverCategoryProps } from "@modules/catalog/domain/category/category.types";
import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let updateCategoryUseCaseMock: MockProxy<UpdateCategoryUseCase>;
let updateCategoryController: UpdateCategoryExpressController;

describe('Controller Express: Update Category', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        updateCategoryUseCaseMock = mock<UpdateCategoryUseCase>();
        updateCategoryController = new UpdateCategoryExpressController(updateCategoryUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(updateCategoryUseCaseMock);
    });

    test('Should Update A Category', async () => {

        const categoryInputDTO: RecoverCategoryProps = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        requestMock.body = categoryInputDTO;

        updateCategoryUseCaseMock.execute.mockResolvedValue(true);

        responseMock.status.mockReturnThis();

        await updateCategoryController.update(requestMock, responseMock, nextMock);

        expect(updateCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(true);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });

    test('Should Handle A Category Not Found Exception', async () => {

        const categoryInputDTO: RecoverCategoryProps = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        requestMock.body = categoryInputDTO;

        updateCategoryUseCaseMock.execute.mockRejectedValue(new CategoryApplicationExceptions.CategoryNotFound());

        responseMock.status.mockReturnThis();

        await updateCategoryController.update(requestMock, responseMock, nextMock);

        expect(updateCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});
