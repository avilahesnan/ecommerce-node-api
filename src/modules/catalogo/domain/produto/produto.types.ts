import { IDatasController, keyDataController } from "@shared/domain/datas.types"
import { ICategoria } from "../categoria/categoria.types"

export enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}

export interface IProduto extends IDatasController {
    id?: string
    nome: string
    descricao: string
    valor: number
    categorias: Array<ICategoria>
    status?: StatusProduto

}

export type CreateProdutoProps = Omit<IProduto, "id" | keyDataController | "status">

export type RecoverProdutoProps = IProduto & {
    id: NonNullable<IProduto["id"]>
}