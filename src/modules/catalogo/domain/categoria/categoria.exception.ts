import { DomainException } from "@shared/domain/domain.exception"

export class CategoriaException extends DomainException {
    constructor(message:string = '⚠️ Exceção de Domínio Genérica da Entidade Categoria') {
        super(message)
        this.name = 'CategoriaException'
        this.message = message
    }
}

export class NomeCategoriaNuloOuIndefinido extends CategoriaException {
    public constructor(message:string = '⚠️ O nome da categoria é nulo ou indefinido.') {
        super(message)
        this.name = 'NomeCategoriaNuloOuIndefinido'
        this.message = message
    }
}

export class NomeCategoriaTamanhoMinimoInvalido extends CategoriaException {
    public constructor(message:string = '⚠️ O nome da categoria não possui um tamanho mínimo válido.') {
        super(message)
        this.name = 'NomeCategoriaTamanhoMinimoInvalido'
        this.message = message
    }
}

export class NomeCategoriaTamanhoMaximoInvalido extends CategoriaException {
    public constructor(message:string = '⚠️ O nome da categoria não possui um tamanho máximo válido.') {
        super(message)
        this.name = 'NomeCategoriaTamanhoMaximoInvalido'
        this.message = message
    }
}

export const categoriaExceptions = {
    CategoriaException: CategoriaException,
    NomeCategoriaNuloOuIndefinido: NomeCategoriaNuloOuIndefinido,
    NomeCategoriaTamanhoMinimoInvalido: NomeCategoriaTamanhoMinimoInvalido,
    NomeCategoriaTamanhoMaximoInvalido: NomeCategoriaTamanhoMaximoInvalido
}