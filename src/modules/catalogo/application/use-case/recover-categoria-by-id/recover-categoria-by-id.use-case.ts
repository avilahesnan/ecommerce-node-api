import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface"
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types"
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map"
import { IUseCase } from "@shared/application/use-case.interface"
import { CategoriaApplicationExceptions } from "../../exception/categoria.application.exception"

export class RecoverCategoriaByIdUseCase implements IUseCase<string, ICategoria> {

    private _categoriaRepositorio: ICategoriaRepository<Categoria>

    constructor(repositorio: ICategoriaRepository<Categoria>){
        this._categoriaRepositorio = repositorio
    }
    
    async execute(uuid: string): Promise<ICategoria> {
        
        const existeCategoria: boolean = await this._categoriaRepositorio.exists(uuid)

        if (!existeCategoria) {
            throw new CategoriaApplicationExceptions.CategoriaNaoEncontrada()
        }

        const categoria = await this._categoriaRepositorio.recoverByUuid(uuid)

        return CategoriaMap.toDTO(categoria as Categoria)
    }
}