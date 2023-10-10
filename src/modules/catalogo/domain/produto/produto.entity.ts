import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { Entity } from "@shared/domain/entity";
import { Categoria } from "../categoria/categoria.entity";
import { ProdutoExceptions} from "./produto.exception";
import { CreateProdutoProps, IProduto, RecoverProdutoProps } from "./produto.types";

export class Produto extends Entity<IProduto> implements IProduto {
    
    private _nome: string = '';
    private _descricao: string = '';
    private _valor: number = 0;
    private _categorias: Categoria[] = [];
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;
    private _dataExclusao?: Date | null | undefined;

    public static readonly QTD_MINIMA_CATEGORIAS = 1;
    public static readonly QTD_MAXIMA_CATEGORIAS = 3;

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new ProdutoExceptions.NomeProdutoNuloOuIndefinido();
        }
        if (value.length < 5) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido();
        }
        if (value.length > 50) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido();
        }
        this._nome = value;
    }

    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(value: string) {
        if (value.length < 10) {
            throw new ProdutoExceptions.NomeDescricaoTamanhoMinimoInvalido();
        }
        if (value.length > 200) {
            throw new ProdutoExceptions.NomeDescricaoTamanhoMaximoInvalido();
        }
        this._descricao = value;
    }

    public get valor(): number {
        return this._valor;
    }
    
    private set valor(value: number) {
        if (value < 0) {
            throw new ProdutoExceptions.ValorMinimoInvalido();
        }
        this._valor = value;
    }

    public get categorias(): Categoria[] {
        return this._categorias;
    }

    private set categorias(value: Categoria[]) {
        if (value.length < Produto.QTD_MINIMA_CATEGORIAS) {
            throw new ProdutoExceptions.QuantidadeCategoriasMinimoInvalido();
        }
        if (value.length > Produto.QTD_MAXIMA_CATEGORIAS) {
            throw new ProdutoExceptions.QuantidadeCategoriasMaximoInvalido();
        }
        this._categorias = value;
    }

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }

    private set dataCriacao(value: Date | undefined) {
        this._dataCriacao = value;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }

    private set dataAtualizacao(value: Date | undefined) {
        this._dataAtualizacao = value;
    }

    public get dataExclusao(): Date | null | undefined {
        return this._dataExclusao;
    }

    private set dataExclusao(value: Date | null | undefined) {
        this._dataExclusao = value;
    }
    
    private constructor(props: IProduto) {
        super(props.id);
        this.nome = props.nome;
        this.descricao = props.descricao;
        this.valor = props.valor;
        this.categorias = props.categorias;
        this.dataCriacao = props.dataCriacao;
        this.dataAtualizacao = props.dataAtualizacao;
        this.dataExclusao = props.dataExclusao;
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

    public isDeleted(): boolean {
        return this.dataExclusao !== null ? true : false;
    }

    public quantityCategorias(): number {
        return this.categorias.length;
    }

    public hasCategoria(categoria: Categoria): boolean {
        const categoriaExistente = this.categorias.find((categoriaExistente) => categoriaExistente.id === categoria.id)

        if (categoriaExistente) {
            return true;
        }
        return false;
    }

    public addCategoria(categoria: Categoria): Categoria {
        if (this.quantityCategorias() >= Produto.QTD_MAXIMA_CATEGORIAS) {
            throw new ProdutoExceptions.ProdutoJaPossuiQtdMaximaCategorias();
        }

        if (this.hasCategoria(categoria)) {
            throw new ProdutoExceptions.ProdutoJaPossuiCategoriaInformada();
        }

        this.categorias.push(categoria);
        return categoria;
    }

}