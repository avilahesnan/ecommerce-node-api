import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";
import { Entity } from "@shared/domain/entity";
import { categoriaExceptions } from "./categoria.exception";
import { CreateCategoriaProps, ICategoria, RecoverCategoriaProps } from "./categoria.types";

export class Categoria extends Entity<ICategoria> implements ICategoria {

    private _nome: string = '';
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;

    public static readonly TAMANHO_MINIMO_NOME = 3;
    public static readonly TAMANHO_MAXIMO_NOME = 50;
    

    public get nome(): string {
        return this._nome;
    }

    private set nome(nome: string) {

        const tamanhoNome = nome.trim().length;

        if (nome === null || nome === undefined) {
            throw new categoriaExceptions.NomeCategoriaNuloOuIndefinido();
        }

        if (tamanhoNome < Categoria.TAMANHO_MINIMO_NOME) {
            throw new categoriaExceptions.NomeCategoriaTamanhoMinimoInvalido();
        }
        
        if (tamanhoNome > Categoria.TAMANHO_MAXIMO_NOME) {
            throw new categoriaExceptions.NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = nome;
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

    private constructor(props: ICategoria) {
        super(props.id);
        this.nome = props.nome;
        this.dataCriacao = props.dataCriacao;
        this.dataAtualizacao = props.dataAtualizacao;
    }

    public static create(props: CreateCategoriaProps): Categoria {
        return new Categoria(props);
    }

    public static recover(props: RecoverCategoriaProps): Categoria {
        return new Categoria(props);
    }

    public toDTO(): ICategoria {
        return CategoriaMap.toDTO(this);
    }

}