import { IDatasController, keyDataController } from "@shared/domain/datas.types"

export interface ICategoria extends IDatasController {
    id?: string
    nome: string
}

export type CreateCategoriaProps = Omit<ICategoria, "id" | keyDataController>

export type RecoverCategoriaProps = ICategoria & {
    id: NonNullable<ICategoria["id"]>
}