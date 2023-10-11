import { IDatasController, keyDataController } from "@shared/domain/datas.types";
import { Categoria } from "../categoria/categoria.entity";

export enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}

export interface IProduto extends IDatasController {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categorias: Array<Categoria>;
    status?: StatusProduto;

}

export type CreateProdutoProps = Omit<IProduto, "id" | keyDataController | "status">;

export type RecoverProdutoProps = IProduto & {
    id: NonNullable<IProduto["id"]>
};