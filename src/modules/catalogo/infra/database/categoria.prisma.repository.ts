import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { IRepository } from "@shared/domain/repository.interface";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";

export class CategoriaPrismaRepository extends PrismaRepository implements IRepository<Categoria> {
    async recoverByUuid(uuid: string): Promise<Categoria | null> {
        const categoriaRecovered = await this._datasource.categoria.findUnique({
                where: {
                    id: uuid
                }
            })
        if (categoriaRecovered) {
            return CategoriaMap.toDomain({
                id: categoriaRecovered.id,
                nome: categoriaRecovered.nome
            })
        }
        return null
    }
    recoverAll(): Promise<Categoria[]> {
        throw new Error("Method not implemented.");
    }
    exists(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    insert(entity: Categoria): Promise<Categoria> {
        throw new Error("Method not implemented.");
    }
    update(uuid: string, entity: Partial<Categoria>): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
}