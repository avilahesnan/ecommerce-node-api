import { Categoria } from "../domain/categoria.entity";
import { ICategoria, RecoverCategoriaProps } from "../domain/categoria.types";

export class CategoriaMap {
    public static toDTO(categoria: Categoria): ICategoria {
        return {
            id: categoria.id,
            nome: categoria.nome
        }
    }

    public static toDomain(cateogira: RecoverCategoriaProps): Categoria {
        return Categoria.recover(cateogira);
    }
}