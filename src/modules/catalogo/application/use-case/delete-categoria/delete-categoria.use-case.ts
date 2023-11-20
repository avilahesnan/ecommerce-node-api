import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface"
import { IUseCase } from "@shared/application/use-case.interface"
import { CategoriaApplicationExceptions } from "../../exception/categoria.application.exception"

export class DeleteCategoriaUseCase implements IUseCase<string, boolean> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>

    constructor(repositorio: ICategoriaRepository<Categoria>) {
        this._categoriaRepositorio = repositorio
    }
    
    async execute(uuid: string): Promise<boolean> {

        const existeCategoria: boolean = await this._categoriaRepositorio.exists(uuid)

        if (!existeCategoria) {
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada()
        }

        const deletouCategoria: boolean = await this._categoriaRepositorio.delete(uuid)

        return deletouCategoria
    }
}