import { 
    NomeCategoriaNuloOuIndefinido,
    NomeCategoriaTamanhoMaximoInvalido,
    NomeCategoriaTamanhoMinimoInvalido 
} from "./categoria.exception";
import { CreateCategoriaProps, ICategoria, RecoverCategoriaProps } from "./categoria.types";
import { Entity } from "../../../../shared/domain/entity";
import { CategoriaMap } from "../../mappers/categoria.map";

export class Categoria extends Entity<ICategoria> implements ICategoria {
    private _nome: string = '';

    public get nome(): string {
        return this._nome;
    }

    private set nome(value: string) {
        if (value === null || value === undefined) {
            throw new NomeCategoriaNuloOuIndefinido;
        }

        if (value.trim().length < 3) {
            throw new NomeCategoriaTamanhoMinimoInvalido;
        }
        
        if (value.trim().length > 50) {
            throw new NomeCategoriaTamanhoMaximoInvalido;
        }

        this._nome = value;
    }

    private constructor(props: ICategoria) {
        super(props.id);
        this.nome = props.nome;
    }

    public static create(props: CreateCategoriaProps): Categoria {
        let { nome } = props;
        return new Categoria({ nome });
    }

    public static recover(props: RecoverCategoriaProps): Categoria {
        return new Categoria(props);
    }

    public toDTO(): ICategoria {
        return CategoriaMap.toDTO(this);
    }
}