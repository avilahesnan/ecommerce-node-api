import { Prisma } from "@prisma/client"
import { Categoria } from "../../domain/categoria/categoria.entity"
import { ICategoria, RecoverCategoriaProps } from "../../domain/categoria/categoria.types"

export class CategoriaMap {

    public static toDTO(categoria: Categoria): ICategoria {
        return {
            id: categoria.id,
            nome: categoria.nome,
            dataCriacao: categoria.dataCriacao,
            dataAtualizacao: categoria.dataAtualizacao
        }
    }

    public static toDomain(categoria: RecoverCategoriaProps): Categoria {
        return Categoria.recover(categoria)
    }

    public static fromPrismaModeltoDomain(categoriaPrisma: Prisma.CategoriaCreateInput): Categoria {
        return CategoriaMap.toDomain ({
            id: categoriaPrisma.id,
            nome: categoriaPrisma.nome,
            dataCriacao: categoriaPrisma.dataCriacao as Date,
            dataAtualizacao: categoriaPrisma.dataAtualizacao as Date
        })
    }
}