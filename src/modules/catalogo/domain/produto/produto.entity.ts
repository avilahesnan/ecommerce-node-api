import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";
import { Entity } from "@shared/domain/entity";
import { Categoria } from "../categoria/categoria.entity";
import { ProdutoExceptions} from "./produto.exception";
import { CreateProdutoProps, IProduto, RecoverProdutoProps, StatusProduto } from "./produto.types";

export class Produto extends Entity<IProduto> implements IProduto {
    
    private _nome: string = '';
    private _descricao: string = '';
    private _valor: number = 0;
    private _categorias: Categoria[] = [];
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;
    private _dataExclusao?: Date | null | undefined;
    private _status?: StatusProduto | undefined;

    public static readonly TAMANHO_MINIMO_NOME = 5;
    public static readonly TAMANHO_MAXIMO_NOME = 50;
    public static readonly TAMANHO_MINIMO_DESCRICAO = 10;
    public static readonly TAMANHO_MAXIMO_DESCRICAO = 200;
    public static readonly VALOR_MINIMO = 0;
    public static readonly QTD_MINIMA_CATEGORIAS = 1;
    public static readonly QTD_MAXIMA_CATEGORIAS = 3;

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {
        
        const tamanhoNome = nome.trim().length;

        if (nome === null || nome === undefined) {
            throw new ProdutoExceptions.NomeProdutoNuloOuIndefinido();
        }
        if (tamanhoNome < Produto.TAMANHO_MINIMO_NOME) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido();
        }
        if (tamanhoNome > Produto.TAMANHO_MAXIMO_NOME) {
            throw new ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido();
        }
        this._nome = nome;
    }

    public get descricao(): string {
        return this._descricao;
    }

    private set descricao(descricao: string) {

        const tamanhoDescricao = descricao.trim().length
        if (tamanhoDescricao < Produto.TAMANHO_MINIMO_DESCRICAO) {
            throw new ProdutoExceptions.NomeDescricaoTamanhoMinimoInvalido();
        }
        if (tamanhoDescricao > Produto.TAMANHO_MAXIMO_DESCRICAO) {
            throw new ProdutoExceptions.NomeDescricaoTamanhoMaximoInvalido();
        }
        this._descricao = descricao;
    }

    public get valor(): number {
        return this._valor;
    }
    
    private set valor(valor: number) {
        if (valor < Produto.VALOR_MINIMO) {
            throw new ProdutoExceptions.ValorMinimoInvalido();
        }
        this._valor = valor;
    }

    public get categorias(): Categoria[] {
        return this._categorias;
    }

    private set categorias(categorias: Categoria[]) {

        const qtdCategorias = categorias.length;

        if (qtdCategorias < Produto.QTD_MINIMA_CATEGORIAS) {
            throw new ProdutoExceptions.QuantidadeCategoriasMinimoInvalido();
        }
        if (qtdCategorias > Produto.QTD_MAXIMA_CATEGORIAS) {
            throw new ProdutoExceptions.QuantidadeCategoriasMaximoInvalido();
        }
        this._categorias = categorias;
    }

    public get dataCriacao(): Date | undefined {
        return this._dataCriacao;
    }

    private set dataCriacao(dataCriacao: Date | undefined) {
        this._dataCriacao = dataCriacao;
    }

    public get dataAtualizacao(): Date | undefined {
        return this._dataAtualizacao;
    }

    private set dataAtualizacao(dataAtualizacao: Date | undefined) {
        this._dataAtualizacao = dataAtualizacao;
    }

    public get dataExclusao(): Date | null | undefined {
        return this._dataExclusao;
    }

    private set dataExclusao(dataExclusao: Date | null | undefined) {
        this._dataExclusao = dataExclusao;
    }

    public get status(): StatusProduto | undefined {
        return this._status;
    }

    private set status(status: StatusProduto | undefined) {
        this._status = status;
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
        this.status = props.status;
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
    
    public removeCategoria(categoria: Categoria): Categoria {

        const qtdCategoriaDoProduto: number = this.quantityCategorias();
        const produtoNaoPossuiCategoria: boolean = !this.hasCategoria(categoria);

        if (qtdCategoriaDoProduto <= Produto.QTD_MINIMA_CATEGORIAS) {
            throw new ProdutoExceptions.ProdutoJaPossuiQtdMinimaCategorias();
        }

        if (produtoNaoPossuiCategoria) {
            throw new ProdutoExceptions.ProdutoNaoPossuiCategoriaInformada();
        }

        this.categorias.filter((categoriaExistente, index, arrayCategorias) => {
            if (categoriaExistente.id === categoria.id) {
                arrayCategorias.splice(index, 1)
            }
        })
        return categoria;
    }
}