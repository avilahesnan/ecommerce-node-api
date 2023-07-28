import { Entity } from "../../../shared/domain/entity";
import { Categoria } from "./categoria.entity";
import { NomeDescricaoTamanhoMaximoInvalido,
    NomeDescricaoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido,
    QuantidadeCategoriasMaximoInvalido,
    QuantidadeCategoriasMinimoInvalido,
    ValorMinimoInvalido} from "./produto.exception";
import { CreateProdutoProps, IProduto} from "./produto.types";

export class Produto implements IProduto {
    private _nome: string = '';
    private _descricao: string = '';
    private _valor: number = 0;
    private _categoria: Categoria[] = [];

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value.length < 5) {
            throw new NomeProdutoTamanhoMinimoInvalido();
        }
        if (value.length > 50) {
            throw new NomeProdutoTamanhoMaximoInvalido();
        }
        this._nome = value;
    }

    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(value: string) {
        if (value.length < 10) {
            throw new NomeDescricaoTamanhoMinimoInvalido();
        }
        if (value.length > 200) {
            throw new NomeDescricaoTamanhoMaximoInvalido();
        }
        this._descricao = value;
    }

    public get valor(): number {
        return this._valor;
    }
    
    private set valor(value: number) {
        if (value < 0) {
            throw new ValorMinimoInvalido();
        }
        this._valor = value;
    }

    public get categoria(): Categoria[] {
        return this._categoria;
    }

    private set categoria(value: Categoria[]) {
        if (value.length < 1) {
            throw new QuantidadeCategoriasMinimoInvalido();
        }
        if (value.length > 3) {
            throw new QuantidadeCategoriasMaximoInvalido();
        }
        this._categoria = value;
    }
    private constructor(props: IProduto) {
       this.nome = props.nome;
       this.descricao = props.descricao;
       this.valor = props.valor;
       this.categoria = props.categoria;
    }

    public static create(props: CreateProdutoProps): Produto {
        let { nome } = props;
        let { descricao } = props;
        let { valor } = props;
        let { categoria } = props;
        return new Produto({ nome, descricao, valor, categoria });
    }
}