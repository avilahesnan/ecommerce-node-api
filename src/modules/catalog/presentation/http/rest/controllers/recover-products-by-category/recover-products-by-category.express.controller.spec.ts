import { RecoverProductsByCategoryUseCase } from "@modules/catalog/application/use-cases/recover-products-by-category/recover-products-by-category.use-case";
import { Request, Response } from "express";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverProductsByCategoryExpressController } from "./recover-products-by-category.express.controller";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { CategoryApplicationExceptions } from "@modules/catalog/application/exceptions/category.application.exception";
import { HttpErrors } from "@shared/presentation/http/http.error";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let recoverProductsByCategoryUseCaseMock: MockProxy<RecoverProductsByCategoryUseCase>;
let recoverProductsByCategoryController: RecoverProductsByCategoryExpressController;

describe('Controller Express: Recover Products By Category', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        recoverProductsByCategoryUseCaseMock = mock<RecoverProductsByCategoryUseCase>();
        recoverProductsByCategoryController = new RecoverProductsByCategoryExpressController(recoverProductsByCategoryUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(recoverProductsByCategoryUseCaseMock);
    });

    test('Should Recover Products By Category', async () => {

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
                    id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                    name: "Mesa",
                }
            ],
            dateDeletion: null,
        }];

        const category = {
            id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
            name: "Mesa",
        }

        requestMock.params.id = category.id as string;

        recoverProductsByCategoryUseCaseMock.execute.mockResolvedValue(listProducts);

        responseMock.status.mockReturnThis();

        await recoverProductsByCategoryController.recoverByCategory(requestMock, responseMock, nextMock);

        expect(recoverProductsByCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(category.id);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(listProducts);

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

        recoverProductsByCategoryUseCaseMock.execute.mockRejectedValue(new CategoryApplicationExceptions.CategoryNotFound());

        responseMock.status.mockReturnThis();

        await recoverProductsByCategoryController.recoverByCategory(requestMock, responseMock, nextMock);

        expect(recoverProductsByCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO.id);

        expect(nextMock)
            .toHaveBeenCalled();

        expect(nextMock.mock.lastCall[0].name)
            .toBe(HttpErrors.NotFoundError.name);
    });
});