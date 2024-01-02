import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { DeleteCategoryExpressController } from "./delete-category.express.controller";
import { DeleteCategoryUseCase } from "@modules/catalog/application/use-cases/delete-category/delete-category.use-case";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { Request, Response } from "express";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let deleteCategoryUseCaseMock: MockProxy<DeleteCategoryUseCase>;
let deleteCategoryController: DeleteCategoryExpressController;

describe('Controller Express: Delete Category', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        deleteCategoryUseCaseMock = mock<DeleteCategoryUseCase>();
        deleteCategoryController = new DeleteCategoryExpressController(deleteCategoryUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(deleteCategoryUseCaseMock);
    });

    test('Should Delete A Category', async () => {

        const categoryInputDTO: ICategory = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa"
        };

        requestMock.params.id = categoryInputDTO.id as string;

        deleteCategoryUseCaseMock.execute.mockResolvedValue(true);

        responseMock.status.mockReturnThis();

        await deleteCategoryController.delete(requestMock, responseMock, nextMock);

        expect(deleteCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO.id);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(true);

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

        deleteCategoryUseCaseMock.execute.mockRejectedValue(new CategoryApplicationExceptions.CategoryNotFound());

        responseMock.status.mockReturnThis();

        await deleteCategoryController.delete(requestMock, responseMock, nextMock);

        expect(deleteCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO.id);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});