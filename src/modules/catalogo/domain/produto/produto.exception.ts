import { DomainException } from "@shared/domain/domain.exception";

export class ProdutoException extends DomainException {
  constructor(message:string = '⚠️ Exceção de Domínio Genérica da Entidade Produto') {
    super(message);
    this.name = 'ProdutoException'
    this.message = message;
  }
}

export class NomeProdutoNuloOuIndefinido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto é nulo ou indefinido.') {
    super(message);
    this.name = 'NomeProdutoNuloOuIndefinido'
    this.message = message;
  }
}

export class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMinimoInvalido'
    this.message = message;
  }
}

export class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMaximoInvalido'
    this.message = message;
  }
}

export class NomeDescricaoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Descricao não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'NomeDescricaoTamanhoMinimoInvalido'
    this.message = message;
  }
}
  
export class NomeDescricaoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Descricao não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'NomeDescricaoTamanhoMaximoInvalido'
    this.message = message;
  }
}

export class ValorMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O valor não possui o valor mínimo válido.') {
    super(message);
    this.name = 'ValorMinimoInvalido'
    this.message = message;
  }
}

export class QuantidadeCategoriasMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ As categorias não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'QuantidadeCategoriasMaximoInvalido'
    this.message = message;
  }
}
  
export class QuantidadeCategoriasMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ As categorias não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'QuantidadeCategoriasMinimoInvalido'
    this.message = message;
  }
}