import { Prisma } from "@prisma/client";
import { Categoria } from "../domain/categoria/categoria.entity";
import { ICategoria, RecoverCategoriaProps } from "../domain/categoria/categoria.types";

export class CategoriaMap {

    public static toDTO(categoria: Categoria): ICategoria {
        return {
            id: categoria.id,
            nome: categoria.nome
        }
    }

    public static toDomain(categoria: RecoverCategoriaProps): Categoria {
        return Categoria.recover(categoria);
    }

    public static fromPrismaModeltoDomain(categoria: Prisma.CategoriaCreateInput): Categoria {
        return CategoriaMap.toDomain ({
            id: categoria.id,
            nome: categoria.nome
        });
    }

}