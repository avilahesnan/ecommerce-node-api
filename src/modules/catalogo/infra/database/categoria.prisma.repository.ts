import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map"
import { IRepository } from "@shared/domain/repository.interface"
import { PrismaRepository } from "@shared/infra/database/prisma.repository"

export class CategoriaPrismaRepository extends PrismaRepository implements IRepository<Categoria> {

    async recoverByUuid(uuid: string): Promise<Categoria | null> {
        
        const categoriaRecuperada = await this._datasource.categoria.findUnique({
                where: {
                    id: uuid
                }
            })

        if (categoriaRecuperada) {
            return CategoriaMap.fromPrismaModeltoDomain(categoriaRecuperada)
        }

        return null
    }

    async recoverAll(): Promise<Array<Categoria>> {
        
        const categoriasRecuperadas = await this._datasource.categoria.findMany()
        
        const categorias = categoriasRecuperadas.map(
            (categoria) => CategoriaMap.fromPrismaModeltoDomain(categoria)
        )

        return categorias
    }

    async exists(uuid: string): Promise<boolean> {
        
        const categoriaExistente = await this.recoverByUuid(uuid)
        
        if (categoriaExistente) {
            return true
        }

        return false
    }

    async insert(categoria: Categoria): Promise<Categoria> {
        
        const categoriaInserida = await this._datasource.categoria.create({
                data: {
                    id: categoria.id,
                    nome: categoria.nome
                }
            })

        return CategoriaMap.fromPrismaModeltoDomain(categoriaInserida)
    }

    async update(uuid: string, categoria: Categoria): Promise<boolean> {
        
        const categoriaAtualizada = await this._datasource.categoria.update({
            where: {
                id: uuid
            },
            data: CategoriaMap.toDTO(categoria)
        })

        if (categoriaAtualizada) {
            return true
        }

        return false   
    }

    async delete(uuid: string): Promise<boolean> {
        
        const categoriaDeletada = await this._datasource.categoria.delete({
            where: {
                id: uuid
            }
        })

        if (categoriaDeletada.id) {
            return true
        }

        return false
    }  
}