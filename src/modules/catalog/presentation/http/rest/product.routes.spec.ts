import express, { Application } from "express";
import request from 'supertest';
import { MockProxy, mock, mockReset } from "vitest-mock-extended";
import { RecoverProductByIdExpressController } from "./controllers/recover-product-by-id/recover-product-by-id.express.controller";
import { RecoverAllProductsExpressController } from "./controllers/recover-all-products/recover-all-products.express.controller";
import { InsertProductExpressController } from "./controllers/insert-product/insert-product.express.controller";
import { UpdateProductExpressController } from "./controllers/update-product/update-product.express.controller";
import { DeleteProductExpressController } from "./controllers/delete-product/delete-product.express.controller";
import { afterEach, beforeAll, beforeEach, describe, expect, test, vi } from "vitest";
import { CreateProductProps, IProduct } from "@modules/catalog/domain/product/product.types";

let appMock: Application;
let recoverProductByIdControllerMock: MockProxy<RecoverProductByIdExpressController>;
let recoverAllProductsControllerMock: MockProxy<RecoverAllProductsExpressController>;
let insertProductControllerMock: MockProxy<InsertProductExpressController>;
let updateProductControllerMock: MockProxy<UpdateProductExpressController>;
let deleteProductControllerMock: MockProxy<DeleteProductExpressController>;

describe('[REST] Routes Express: Product', () => {

    beforeAll(async () => {
        recoverProductByIdControllerMock = mock<RecoverProductByIdExpressController>();
        recoverAllProductsControllerMock = mock<RecoverAllProductsExpressController>();
        insertProductControllerMock = mock<InsertProductExpressController>();
        updateProductControllerMock = mock<UpdateProductExpressController>();
        deleteProductControllerMock = mock<DeleteProductExpressController>();
    });

    beforeEach(async () => {
        appMock = express();
    });

    afterEach(() => {
        vi.resetAllMocks();
        mockReset(recoverProductByIdControllerMock);
        mockReset(recoverAllProductsControllerMock);
        mockReset(insertProductControllerMock);
        mockReset(updateProductControllerMock);
        mockReset(deleteProductControllerMock);
    });

    describe('GET api/v1/products/:id', () => {

        test('Should Return Status 200 and An Object of Type IProduct in JSON Format', async () => {

            const productInputDTO: IProduct = {
                id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
                name: "Iphone",
                description: "Um ótimo smartphone",
                value: 3500,
                categories: [
                    {
                        id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                        name: "Mesa",
                    }
                ]
            };

            recoverProductByIdControllerMock.recover.mockImplementation(async (request, response, next) => {
                response.status(200).json(productInputDTO);
            });

            appMock.use('/api/v1/products/:id', recoverProductByIdControllerMock.recover);

            const response = await request(appMock)
                .get('/api/v1/products/855d3ea6-e4ca-414a-aecd-807ef0ca43ea');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(productInputDTO);
        });
    });

    describe('GET api/v1/products', () => {

        test('Should Return Status 200 and All Objects of Type IProduct in JSON Format', async () => {

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

            recoverAllProductsControllerMock.recover.mockImplementation(async (request, response, next) => {
                response.status(200).json(listProducts);
            });

            appMock.use('/api/v1/products', recoverAllProductsControllerMock.recover);

            const response = await request(appMock)
                .get('/api/v1/products');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(listProducts);
        });
    });

    describe('POST api/v1/products', () => {

        test('Should Return Status 200 and An Object of Type IProduct in JSON Format', async () => {

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

            const productOutputDTO: IProduct = {
                id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
                name: "Iphone",
                description: "Um ótimo smartphone",
                value: 3500,
                categories: [
                    {
                        id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                        name: "Mesa",
                    }
                ]
            };

            insertProductControllerMock.insert.mockImplementation(async (request, response, next) => {
                response.status(200).json(productOutputDTO);
            });

            appMock.use('/api/v1/products', insertProductControllerMock.insert);

            const response = await request(appMock)
                .post('/api/v1/products')
                .send(productInputDTO);

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(productOutputDTO);
        });
    });

    describe('PUT api/v1/products/:id', () => {
        
        test('Should Return Status 200 and True', async () => {

            const productInputDTO: IProduct = {
                id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
                name: "Iphone",
                description: "Um ótimo smartphone",
                value: 3500,
                categories: [
                    {
                        id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                        name: "Mesa",
                    }
                ]
            };

            updateProductControllerMock.update.mockImplementation(async (request, response, next) => {
                response.status(200).json(true);
            });

            appMock.use('/api/v1/products/:id', updateProductControllerMock.update);

            const response = await request(appMock)
                .put('/api/v1/products/855d3ea6-e4ca-414a-aecd-807ef0ca43ea');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(true);
        });
    });

    describe('DELETE api/v1/products/:id', () => {

        test('Should Return Status 200 and true', async () => {

            const productInputDTO: IProduct = {
                id: "855d3ea6-e4ca-414a-aecd-807ef0ca43ea",
                name: "Iphone",
                description: "Um ótimo smartphone",
                value: 3500,
                categories: [
                    {
                        id: "a22a6030-bf2f-424b-b72e-2ca49e774094",
                        name: "Mesa",
                    }
                ]
            };

            deleteProductControllerMock.delete.mockImplementation(async (request, response, next) => {
                response.status(200).json(true);
            });

            appMock.use('/api/v1/products/:id', deleteProductControllerMock.delete);

            const response = await request(appMock)
                .delete('/api/v1/products/855d3ea6-e4ca-414a-aecd-807ef0ca43ea');

            expect(response.status)
                .toEqual(200);

            expect(response.headers["content-type"])
                .toMatch(/json/);

            expect(response.body)
                .toEqual(true);
        });
    });
});