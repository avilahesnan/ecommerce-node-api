import dotenv from 'dotenv';
import { createHTTPServer } from './presentation/http/server';
import { prisma } from './infra/database/orm/prisma/client';
import { Application } from 'express';
import { createExpressApplication } from './presentation/http/app.express';
import { logger } from '@shared/helpers/logger.winston';

async function bootstrap() {
    
    dotenv.config();

    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;

    logger.info(`Initializing the API....🚀`);

    const app: Application = await createExpressApplication();

    logger.ok(`Express Application Instanced and Configured`);

    const httpServer = await createHTTPServer(app);
    
    logger.ok('Instanced and Configured HTTP Server');

    httpServer.listen({port: port}, async () =>  logger.ok(`HTTP Server Ready and Listening On http://${host_name}:${port}`));
    
    prisma.$connect().then(
        async () => logger.ok(`Connected Database`)
    );
}

bootstrap()
    .catch((error) => logger.error(error.message));