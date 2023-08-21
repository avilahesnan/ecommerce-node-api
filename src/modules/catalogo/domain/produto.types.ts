import { Categoria } from "./categoria.entity";

export interface IProduto {
    id?: string;
    nome: string;
    descricao: string;
    valor: number;
    categoria: Categoria[];
}

export type CreateProdutoProps = Omit<IProduto, "id">;