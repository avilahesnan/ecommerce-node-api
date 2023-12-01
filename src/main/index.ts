import dotenv from 'dotenv';
import { createHTTPServer } from './presentation/http/server';
import { prisma } from './infra/database/orm/prisma/client';

async function bootstrap() {
    
    dotenv.config();

    const api_name = process.env.API_NAME;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;

    console.log(`[${api_name}] 🚀 Inicializando a API....`);

    const httpServer = await createHTTPServer();

    httpServer.listen({port: port}, async () => console.log(`[${api_name}] ✅ Servidor HTTP pronto e ouvindo em http://${host_name}:${port}`));
    
    prisma.$connect().then(
        async () => console.log(`[${api_name}] ✅ Banco de Dados conectado`)
    );
}

bootstrap()
    .catch((error) => console.error(error));