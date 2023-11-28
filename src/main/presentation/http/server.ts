import http from "node:http";
import express, { Application } from "express";
import { apiV1Router } from "./rest/api.v1";
import morgan from "morgan";

const app: Application = express();

export const createHTTPServer = async (): Promise<http.Server> => {

    app.disabled('x-powered-by');
    app.use(express.json());
    app.use(morgan('tiny'));
    app.use('/api/v1', apiV1Router);

    const httpServer: http.Server = http.createServer(app);

    return httpServer;
};