import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { Entity } from "@shared/domain/entity";
import { Categoria } from "../categoria/categoria.entity";
import {
    NomeDescricaoTamanhoMaximoInvalido,
    NomeDescricaoTamanhoMinimoInvalido,
    NomeProdutoNuloOuIndefinido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido,
    QuantidadeCategoriasMaximoInvalido,
    QuantidadeCategoriasMinimoInvalido,
    ValorMinimoInvalido
} from "./produto.exception";
import { CreateProdutoProps, IProduto, RecoverProdutoProps } from "./produto.types";

export class Produto extends Entity<IProduto> implements IProduto {
    
    private _nome: string = '';
    private _descricao: string = '';
    private _valor: number = 0;
    private _categorias: Categoria[] = [];

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new NomeProdutoNuloOuIndefinido();
        }
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

    public get categorias(): Categoria[] {
        return this._categorias;
    }

    private set categorias(value: Categoria[]) {
        if (value.length < 1) {
            throw new QuantidadeCategoriasMinimoInvalido();
        }
        if (value.length > 3) {
            throw new QuantidadeCategoriasMaximoInvalido();
        }
        this._categorias = value;
    }
    
    private constructor(props: IProduto) {
        super(props.id);
        this.nome = props.nome;
        this.descricao = props.descricao;
        this.valor = props.valor;
        this.categorias = props.categorias;
    }

    public static create(props: CreateProdutoProps): Produto {
        return new Produto(props);
    }

    public static recover(props: RecoverProdutoProps): Produto {
        return new Produto(props);
    }

    public toDTO(): IProduto {
        return ProdutoMap.toDTO(this)
    }

}