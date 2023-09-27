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

    async recoverAll(): Promise<Array<Categoria>> {
        const categoriaRecovereds = await this._datasource.categoria.findMany()
        const categorias = categoriaRecovereds.map(
            (categoria) => CategoriaMap.toDomain({
                id: categoria.id,
                nome: categoria.nome
            })
        )
        return categorias
    }

    async exists(uuid: string): Promise<boolean> {
        const categoriaExisting = await this.recoverByUuid(uuid)
        if (categoriaExisting) {
            return true
        }
        return false
    }

    async insert(categoria: Categoria): Promise<Categoria> {
        const categoriaInsered = await this._datasource.categoria.create({
                data: {
                    id: categoria.id,
                    nome: categoria.nome
                }
            })
        return categoria
    }

    async update(uuid: string, categoria: Categoria): Promise<boolean> {
        const categoriaUpdated = await this._datasource.categoria.update({
            where: {
                id: uuid
            },
            data: CategoriaMap.toDTO(categoria)
        })
        if (categoriaUpdated) {
            return true
        }
        return false
        
    }

    async delete(uuid: string): Promise<boolean> {
        const categoriaDeleted = await this._datasource.categoria.delete({
            where: {
                id: uuid
            }
        })
        if (categoriaDeleted.id) {
            return true
        }
        return false
    }
    
}