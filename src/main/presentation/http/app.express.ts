import express, { Application } from "express";
import { apiV1Router } from "./rest/api.v1";
import helmet from "helmet";
import compression from "compression";
import { customMorganMiddleware } from "./middlewares/custom-morgan.middleware";
import { errorLogger } from "./middlewares/error-logger.middleware";
import { errorResponser } from "./middlewares/error-responser.middleware";
import { invalidPath } from "./middlewares/invalid-path.middleware";
import cors from "cors";
import { swaggerDocumentation } from "./customizers/swagger-documentation.customizer";

export const createExpressApplication = async (): Promise<Application> => {
    const app: Application = express();
    app.disable('x-powered-by');

    //Middlewares Integrados (Built-in)
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    //Middlewares de Terceiros
    app.use(helmet());
    app.use(compression());
    app.use(cors({
        origin: ['http://localhost:5400', 'http://127.0.0.1:5400'],
        optionsSuccessStatus: 200
    }));

    //Middleware Customizados
    app.use(customMorganMiddleware);
   
    //Middlewares de Rotas
    app.use('/api/v1', apiV1Router);

    //Customizadores
    swaggerDocumentation(app);

    //Middleware de Tratamento de Erros (Error Handling)
    app.use(invalidPath);
    app.use(errorLogger);
    app.use(errorResponser);

    return app;
}
