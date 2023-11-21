import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { ICategoriaRepository } from "@modules/catalogo/domain/categoria/categoria.repository.interface"
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest"
import { MockProxy, mock, mockReset } from "vitest-mock-extended"
import { RecoverCategoriaByIdUseCase } from "./recover-categoria-by-id.use-case"
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types"
import { CategoriaApplicationExceptions } from "../../exception/categoria.application.exception"

let categoriaRepositorioMock: MockProxy<ICategoriaRepository<Categoria>>
let recuperarCategoriaPorIdUseCase: RecoverCategoriaByIdUseCase

describe('Caso de Uso: Recuperar Categoria por ID', () => {

    beforeAll(async () => {

        categoriaRepositorioMock = mock<ICategoriaRepository<Categoria>>()
        recuperarCategoriaPorIdUseCase = new RecoverCategoriaByIdUseCase(categoriaRepositorioMock)
    })

    afterEach(() => {
        vi.restoreAllMocks()
        mockReset(categoriaRepositorioMock)
    })

    test('Deve Recuperar Uma Categoria por UUID', async () =>{

        const categoriaInputDTO = {
            id: "8780ae8d-0d56-43d0-a45b-1a1143bb324f",
            nome: "Cama"
        }

        categoriaRepositorioMock.exists.mockResolvedValue(true)

        categoriaRepositorioMock.recoverByUuid.mockResolvedValue(Categoria.recover(categoriaInputDTO))

        const categoriaOutputDTO: ICategoria = await recuperarCategoriaPorIdUseCase.execute(categoriaInputDTO.id)

        expect(categoriaOutputDTO)
            .toEqual(categoriaInputDTO)

        expect(categoriaRepositorioMock.exists)
            .toHaveBeenCalledTimes(1)

        expect(categoriaRepositorioMock.recoverByUuid)
            .toHaveBeenCalledTimes(1)
    })

    test('Deve Lançar uma Exceção ao Tentar Recuperar uma Categoria que Não Existe', async () => {
   
        const categoriaInputDTO = {
           id: "8780ae8d-0d56-43d0-a45b-1a1143bb324f",
           nome: "Cama"
       }

       categoriaRepositorioMock.exists.mockResolvedValue(false)

       await expect(() => recuperarCategoriaPorIdUseCase.execute("8780ae8d-0d56-43d0-a45b-1a1143bb324f"))
           .rejects
           .toThrowError(CategoriaApplicationExceptions.CategoriaNaoEncontrada)
   });
})