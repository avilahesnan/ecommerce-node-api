import { IDatasController, keyDataController } from "@shared/domain/datas.types";
import { Categoria } from "../categoria/categoria.entity";

export interface IProduto extends IDatasController {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categorias: Categoria[];
}

export type CreateProdutoProps = Omit<IProduto, "id" | keyDataController>;

export type RecoverProdutoProps = IProduto & {
    id: NonNullable<IProduto["id"]>
};