import { Categoria } from "./categoria.entity";

export interface IProduto {
    nome: string;
    descricao: string;
    valor: number;
    categoria: Categoria[];
}

export type CreateProdutoProps = IProduto;
