import { IRepository } from "@shared/domain/repository.interface"
import { Produto } from "./produto.entity"
import { Categoria } from "../categoria/categoria.entity"
import { StatusProduto } from "./produto.types"

export interface IProdutoRepository<T> extends IRepository<T> {
    addCategoria(produto: Produto, categoria: Categoria): Promise<boolean>
    removeCategoria(produto: Produto, categoria: Categoria): Promise<boolean>
    alterStatus(produto: Produto, status: StatusProduto): Promise<boolean>
    recoverByCategoria(idCategoria: string): Promise<Array<Produto>>
}