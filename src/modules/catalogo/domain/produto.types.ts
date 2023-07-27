import { Categoria } from "./categoria.entity";

export interface IProduto {
    id?: string;
    nome: string;
    categoria: Categoria[];
}

export type CreateProdutoProps = Omit<IProduto, "id">;

export type RecoverProdutoProps = Required<IProduto>;