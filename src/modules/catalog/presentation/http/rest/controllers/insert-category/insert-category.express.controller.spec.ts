import { InsertCategoryUseCase } from "@modules/catalog/application/use-cases/insert-category/insert-category.use-case";
import { InsertCategoryExpressController } from "./insert-category.express.controller";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { Mock, afterAll, beforeAll, describe, expect, test, vi, vitest } from "vitest";
import { CreateCategoryProps } from "@modules/catalog/domain/category/category.types";
import { Request, Response } from "express";

let requestMock: MockProxy<Request>;
let responseMock: MockProxy<Response>;
let nextMock: Mock;
let insertCategoryUseCaseMock: MockProxy<InsertCategoryUseCase>;
let insertCategoryController: InsertCategoryExpressController;

describe('Controller Express: Insert Category', () => {

    beforeAll(async () => {
        requestMock = mock<Request>();
        responseMock = mock<Response>();
        nextMock = vitest.fn();
        insertCategoryUseCaseMock = mock<InsertCategoryUseCase>();
        insertCategoryController = new InsertCategoryExpressController(insertCategoryUseCaseMock);
    });

    afterAll(() => {
        vi.resetAllMocks();
        mockReset(requestMock);
        mockReset(responseMock);
        mockReset(insertCategoryUseCaseMock);
    });

    test('Should Insert A Category', async () => {

        const categoryInputDTO: CreateCategoryProps = {
            name: "Banho"
        };

        requestMock.body = categoryInputDTO;

        insertCategoryUseCaseMock.execute.mockResolvedValue(categoryInputDTO);

        responseMock.status.mockReturnThis();

        await insertCategoryController.insert(requestMock, responseMock, nextMock);

        expect(insertCategoryUseCaseMock.execute)
            .toHaveBeenCalledWith(categoryInputDTO);

        expect(responseMock.status)
            .toHaveBeenCalledWith(200);

        expect(responseMock.json)
            .toHaveBeenCalledWith(categoryInputDTO);

        expect(nextMock)
            .not
            .toHaveBeenCalled();
    });
});
