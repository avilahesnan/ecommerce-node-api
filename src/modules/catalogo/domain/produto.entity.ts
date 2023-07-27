import { Entity } from "../../../shared/domain/entity";
import { Categoria } from "./categoria.entity";
import { CreateProdutoProps, IProduto, RecoverProdutoProps } from "./produto.types";

export class Produto extends Entity<IProduto> implements IProduto {
    private _nome: string = '';
    private _categoria: Categoria[] = [];

    public get categoria(): Categoria[] {
        return this._categoria;
    }

    private set categoria(value: Categoria[]) {
        this._categoria = value;
    }

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        this._nome = value;
    }

    private constructor(props: IProduto) {
        super(props.id);
        this.nome = props.nome;
        this.categoria = props.categoria;
    }

    public static create(props: CreateProdutoProps): Produto {
        let { nome } = props;
        let { categoria } = props;
        return new Produto({ nome, categoria });
    }

    public static recover(props: RecoverProdutoProps): Produto {
        return new Produto(props);
    }
}