import { DomainException } from "../../../shared/domain/domain.exception";

export namespace CategoriaException {

    export class NomeTamanhoMininoInvalido extends DomainException {
        constructor(message: string = ' ⚠️ O nome da categoria não possui o tamanho mínimo válido') {
            super(message);
            this.name = 'CategoriaException.NomeTamanhoMininoInvalido'
            this.message = message;
        }
    }

    export class NomeTamanhoMaximoInvalido extends DomainException {
        constructor(message: string = ' ⚠️ O nome da categoria não possui o tamanho máximo válido') {
            super(message);
            this.name = 'CategoriaException.NomeTamanhoMaximoInvalido'
            this.message = message;
        }
    }
}