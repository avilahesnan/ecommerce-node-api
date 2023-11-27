import { PrismaClient } from "@prisma/client";

export abstract class PrismaRepository {
    
    protected _datasource: PrismaClient;

    constructor(prisma: PrismaClient) {
        this._datasource = prisma;
    }
};