import express, { Application } from "express";
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverCategoryByIdExpressController } from "./controllers/recover-category-by-id/recover-category-by-id.express.controller";
import { InsertCategoryExpressController } from "./controllers/insert-category/insert-category.express.controller";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { CreateCategoryProps, ICategory } from "@modules/catalog/domain/category/category.types";
import request from 'supertest';
import { RecoverAllCategoriesExpressController } from "./controllers/recover-all-categories/recover-all-categories.express.controller";
import { UpdateCategoryExpressController } from "./controllers/update-category/update-category.express.controller";
import { DeleteCategoryExpressController } from "./controllers/delete-category/delete-category.express.controller";

let appMock: Application;
let recoverCategoryByIdControllerMock: MockProxy<RecoverCategoryByIdExpressController>;
let recoverAllCategoriesControllerMock: MockProxy<RecoverAllCategoriesExpressController>;
let insertCategoryControllerMock: MockProxy<InsertCategoryExpressController>;
let updateCategoryControllerMock: MockProxy<UpdateCategoryExpressController>;
let deleteCategoryControllerMock: MockProxy<DeleteCategoryExpressController>;

describe('[REST] Routes Express: Category', () => {

    beforeAll(async () => {
        recoverCategoryByIdControllerMock = mock<RecoverCategoryByIdExpressController>();
        recoverAllCategoriesControllerMock = mock<RecoverAllCategoriesExpressController>();
        insertCategoryControllerMock = mock<InsertCategoryExpressController>();
        updateCategoryControllerMock = mock<UpdateCategoryExpressController>();
        deleteCategoryControllerMock = mock<DeleteCategoryExpressController>();
    });

    beforeEach(async () => {
        appMock = express();
    });

    afterEach(() => {
        vi.resetAllMocks();
        mockReset(recoverCategoryByIdControllerMock);
        mockReset(recoverAllCategoriesControllerMock);
        mockReset(insertCategoryControllerMock);
        mockReset(updateCategoryControllerMock);
        mockReset(deleteCategoryControllerMock);
    });

    describe('GET api/v1/categories/:id', () => {

        test('Should Return Status 200 and An Object of Type ICategory in JSON Format', async () => {

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

    describe('GET api/v1/categories', () => {

        test('Should Return Status 200 and All Objects of Type ICategory in JSON Format', async () => {

            const listCategories: Array<ICategory> = [{
                id: "1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60",
                name: "Banho"
            }, {
                id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                name: "Mesa",
            }];

            recoverAllCategoriesControllerMock.recover.mockImplementation(async (request, response, next) => {
                response.status(200).json(listCategories);
            });

            appMock.use('/api/v1/categories', recoverAllCategoriesControllerMock.recover);

            const response = await request(appMock)
                .get('/api/v1/categories');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(listCategories);
        });
    });

    describe('POST api/v1/categories', () => {

        test('Should Return Status 200 and An Object of Type ICategory in JSON Format', async () => {

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

    describe('PUT api/v1/categories/:id', () => {
        
        test('Should Return Status 200 and True', async () => {

            const categoryInputDTO: ICategory = {
                id: "1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60",
                name: "Banho"
            };

            updateCategoryControllerMock.update.mockImplementation(async (request, response, next) => {
                response.status(200).json(true);
            });

            appMock.use('/api/v1/categories/:id', updateCategoryControllerMock.update);

            const response = await request(appMock)
                .put('/api/v1/categories/1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(true);
        });
    });

    describe('DELETE api/v1/categories/:id', () => {

        test('Should Return Status 200 and true', async () => {

            const categoryInputDTO: ICategory = {
                id: "1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60",
                name: "Banho"
            };

            deleteCategoryControllerMock.delete.mockImplementation(async (request, response, next) => {
                response.status(200).json(true);
            });

            appMock.use('/api/v1/categories/:id', deleteCategoryControllerMock.delete);

            const response = await request(appMock)
                .delete('/api/v1/categories/1e1ba042-fa93-40e9-9b74-2a1fdfcd4c60');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(true);
        });
    });
});
