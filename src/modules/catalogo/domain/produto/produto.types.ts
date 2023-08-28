import { Categoria } from "../categoria/categoria.entity";

export interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categorias: Categoria[];
}

export type CreateProdutoProps = Omit<IProduto, "id">;

export type RecoverProdutoProps = Required<IProduto>;