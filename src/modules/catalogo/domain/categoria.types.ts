export interface ICategoria {
    id?: string;
    nome: string;
}

export type CreateCategoriaProps = Omit<ICategoria, "id">;