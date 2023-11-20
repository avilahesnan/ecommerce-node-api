export interface IDatasController {
    dataCriacao?: Date
    dataAtualizacao?: Date
    dataExclusao?: Date | null
}

export type keyDataController = keyof IDatasController