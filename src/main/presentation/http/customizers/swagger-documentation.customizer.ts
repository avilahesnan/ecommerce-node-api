import { logger } from '@shared/helpers/logger.winston';
import { Application } from 'express';
import { readFileSync } from 'fs';
import * as YAML from 'js-yaml';
import path from 'path';
import * as swaggerUI from 'swagger-ui-express';

const OPEN_API_SPEC_FILE_LOCATION = path.join(
    __dirname,
    '..',
    'rest/api.v1.yaml',
);

export const swaggerDocumentation = (app: Application) => {

    logger.info(OPEN_API_SPEC_FILE_LOCATION);

    const swaggerDoc = YAML.load(readFileSync(OPEN_API_SPEC_FILE_LOCATION.toString(), 'utf8'),) as any;
    const host_name = process.env.HOST_NAME;
    const port = process.env.PORT;
    app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
    logger.ok(`API Documentation - at http://${host_name}:${port}/api-docs`);
};
