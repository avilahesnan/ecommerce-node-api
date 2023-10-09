import { CategoriaMap } from "@modules/catalogo/mappers/categoria.map";
import { Entity } from "@shared/domain/entity";
import {
    NomeCategoriaNuloOuIndefinido,
    NomeCategoriaTamanhoMaximoInvalido,
    NomeCategoriaTamanhoMinimoInvalido
} from "./categoria.exception";
import { CreateCategoriaProps, ICategoria, RecoverCategoriaProps } from "./categoria.types";

export class Categoria extends Entity<ICategoria> implements ICategoria {

    private _nome: string = '';
    private _dataCriacao?: Date | undefined;
    private _dataAtualizacao?: Date | undefined;
    

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new NomeCategoriaNuloOuIndefinido();
        }

        if (value.trim().length < 3) {
            throw new NomeCategoriaTamanhoMinimoInvalido();
        }
        
        if (value.trim().length > 50) {
            throw new NomeCategoriaTamanhoMaximoInvalido();
        }

        this._nome = value;
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