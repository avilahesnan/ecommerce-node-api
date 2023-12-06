import express, { Application } from "express";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverCategoryByIdExpressController } from "./controllers/recover-category-by-id/recover-category-by-id.express.controller";
import { InsertCategoryExpressController } from "./controllers/insert-category/insert-category.express.controller";
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest";
import { CreateCategoryProps, ICategory } from "@modules/catalog/domain/category/category.types";
import request from 'supertest';

let appMock: Application;
let recoverCategoryByIdControllerMock: MockProxy<RecoverCategoryByIdExpressController>;
let insertCategoryControllerMock: MockProxy<InsertCategoryExpressController>;

describe('[REST] Routes Express: Category', () => {

    beforeAll(async () => {
        appMock = express();
        recoverCategoryByIdControllerMock = mock<RecoverCategoryByIdExpressController>();
        insertCategoryControllerMock = mock<InsertCategoryExpressController>();
    });

    afterEach(() => {
        vi.resetAllMocks();
        mockReset(recoverCategoryByIdControllerMock);
        mockReset(insertCategoryControllerMock);
    });

    describe('GET api/v1/categories/:id', () => {
        
        test('', async () => {

            const categoryInputDTO: ICategory = {
                id: "1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60",
                name: "Banho"
            };

            recoverCategoryByIdControllerMock.recover.mockImplementation(async (request, response, next) => {
                response.status(200).json(categoryInputDTO);
            });

            appMock.use('/api/v1/categories/:id', recoverCategoryByIdControllerMock.recover);

            const response = await request(appMock)
                .get('/api/v1/categories/1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(categoryInputDTO);
        });
    });

    describe('POST api/v1/categories', () => {

        test('', async () => {

            const categoryInputDTO: CreateCategoryProps = {
                name: "Banho"
            };

            const categoryOutputDTO: ICategory = {
                id: "1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60",
                name: "Banho"
            };

            insertCategoryControllerMock.insert.mockImplementation(async (request, response, next) => {
                response.status(200).json(categoryOutputDTO);
            });

            appMock.use('/api/v1/categories', insertCategoryControllerMock.insert);

            const response = await request(appMock)
                .post('/api/v1/categories')
                .send(categoryInputDTO);

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(categoryOutputDTO);
        });
    });
});