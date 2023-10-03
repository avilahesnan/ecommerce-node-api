import { Categoria } from "@prisma/client";
import { IRepository } from "@shared/domain/repository.interface";

export interface IProdutoRepository<T> extends IRepository<T> {
    recoverByCategorias(categoria: Array<Categoria>): Promise<T>;
    addCategoria(categoria: Categoria): Promise<boolean>;
}