import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface";
import { CreateCategoriaProps, ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { CategoriaMap } from "@modules/catalogo/infra/mappers/categoria.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class InsertCategoriaUseCase implements IUseCase<CreateCategoriaProps, ICategoria> {
    private _categoriaRepositorio: ICategoriaRepository<Categoria>

    constructor(repositorio: ICategoriaRepository<Categoria>) {
        this._categoriaRepositorio = repositorio
    }

    async execute(categoriaProps: CreateCategoriaProps): Promise<ICategoria> {
       
        const categoria: Categoria = Categoria.create(categoriaProps)

        const categoriaInserida = await this._categoriaRepositorio.insert(categoria)

        return CategoriaMap.toDTO(categoriaInserida)
    }
    
}