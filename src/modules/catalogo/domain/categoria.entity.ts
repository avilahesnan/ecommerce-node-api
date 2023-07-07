import { CreateCategoriaProps, ICategoria } from "./categoria.types";

export class Categoria implements ICategoria {
    private _id: string = '';
    private _nome: string = '';

    public get id(): string {
        return this._id;
    }

    private set id(value: string) {
        this._id = value;
    }

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new Error(`${value} é nulo ou indefinido.`);
        }

        if (value.trim().length < 3) {
            throw new Error(`O nome da categoria não possui um tamanho mínimo válido.`);
        }
        
        if (value.trim().length > 50) {
            throw new Error(`O nome da categoria não possui um tamanho máximo válido.`);
        }

        this._nome = value;
    }

    private constructor(props: ICategoria) {
        this.id = props.id;
        this.nome = props.nome;
    }

    public static create(props: CreateCategoriaProps): Categoria {
        let id = "1";
        let { nome } = props;
        return new Categoria({id, nome});
    }
}