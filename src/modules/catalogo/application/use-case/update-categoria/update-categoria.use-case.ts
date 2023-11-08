import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { RecoverCategoriaProps } from "@modules/catalogo/domain/categoria/categoria.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoriaApplicationExceptions } from "../../exception/categoria.application.exception";

export class UpdateCategoriaUseCase implements IUseCase<RecoverCategoriaProps, boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>

    constructor(repositorio: ICategoriaRepository<Categoria>) {
        this._categoriaRepositorio = repositorio
    }

    async execute(categoriaProps: RecoverCategoriaProps): Promise<boolean> {
        
        const existeCategoria: boolean = await this._categoriaRepositorio.exists(categoriaProps.id)

        if (!existeCategoria) {
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada()
        }

        const categoria: Categoria = Categoria.recover(categoriaProps)

        const atualizouCategoria = await this._categoriaRepositorio.update(categoria.id, categoria)

        return atualizouCategoria
    }

}