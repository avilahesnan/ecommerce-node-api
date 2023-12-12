import express, { Application } from "express";
import { apiV1Router } from "./rest/api.v1";
import helmet from "helmet";
import compression from "compression";
import { customMorganMiddleware } from "./middlewares/custom-morgan.middleware";

export const createExpressApplication = async (): Promise<Application> => {
    const app: Application = express();
    app.disable('x-powered-by');
    app.use(helmet());
    app.use(compression());
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(customMorganMiddleware);
    app.use('/api/v1', apiV1Router);
    return app;
}