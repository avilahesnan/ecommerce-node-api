import { DomainException } from "@shared/domain/domain.exception";

class ProdutoException extends DomainException {
  constructor(message:string = '⚠️ Exceção de Domínio Genérica da Entidade Produto') {
    super(message);
    this.name = 'ProdutoException'
    this.message = message;
  }
}

class NomeProdutoNuloOuIndefinido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto é nulo ou indefinido.') {
    super(message);
    this.name = 'NomeProdutoNuloOuIndefinido'
    this.message = message;
  }
}

class NomeProdutoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMinimoInvalido'
    this.message = message;
  }
}

class NomeProdutoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Produto não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'NomeProdutoTamanhoMaximoInvalido'
    this.message = message;
  }
}

class NomeDescricaoTamanhoMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Descricao não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'NomeDescricaoTamanhoMinimoInvalido'
    this.message = message;
  }
}
  
class NomeDescricaoTamanhoMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O nome da Descricao não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'NomeDescricaoTamanhoMaximoInvalido'
    this.message = message;
  }
}

class ValorMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ O valor não possui o valor mínimo válido.') {
    super(message);
    this.name = 'ValorMinimoInvalido'
    this.message = message;
  }
}

class QuantidadeCategoriasMaximoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ As categorias não possui um tamanho máximo válido.') {
    super(message);
    this.name = 'QuantidadeCategoriasMaximoInvalido'
    this.message = message;
  }
}
  
class QuantidadeCategoriasMinimoInvalido extends ProdutoException {
  public constructor(message:string = '⚠️ As categorias não possui um tamanho mínimo válido.') {
    super(message);
    this.name = 'QuantidadeCategoriasMinimoInvalido'
    this.message = message;
  }
}

class ProdutoJaPossuiQtdMaximaCategorias extends ProdutoException {
  public constructor(message:string = '⚠️ O produto já possui a quantidade máxima de categorias.') {
    super(message);
    this.name = 'ProdutoJaPossuiQtdMaximaCategorias'
    this.message = message;
  }
}

class ProdutoJaPossuiCategoriaInformada extends ProdutoException {
  public constructor(message:string = '⚠️ O produto já possui a categoria informada.') {
    super(message);
    this.name = 'ProdutoJaPossuiCategoriaInformada'
    this.message = message;
  }
}

class ProdutoJaPossuiQtdMinimaCategorias extends ProdutoException {
  public constructor(message:string = '⚠️ O produto já possui a mínima de categoria.') {
    super(message);
    this.name = 'ProdutoJaPossuiQtdMinimaCategorias'
    this.message = message;
  }
}

class ProdutoNaoPossuiCategoriaInformada extends ProdutoException {
  public constructor(message:string = '⚠️ O produto não possui a categoria informada.') {
    super(message);
    this.name = 'ProdutoNaoPossuiCategoriaInformada'
    this.message = message;
  }
}

export const ProdutoExceptions = {
  ProdutoException: ProdutoException,
  NomeProdutoNuloOuIndefinido: NomeProdutoNuloOuIndefinido,
  NomeProdutoTamanhoMinimoInvalido: NomeProdutoTamanhoMinimoInvalido,
  NomeProdutoTamanhoMaximoInvalido: NomeProdutoTamanhoMaximoInvalido,
  NomeDescricaoTamanhoMinimoInvalido: NomeDescricaoTamanhoMinimoInvalido,
  NomeDescricaoTamanhoMaximoInvalido: NomeDescricaoTamanhoMaximoInvalido,
  ValorMinimoInvalido: ValorMinimoInvalido,
  QuantidadeCategoriasMinimoInvalido: QuantidadeCategoriasMinimoInvalido,
  QuantidadeCategoriasMaximoInvalido: QuantidadeCategoriasMaximoInvalido,
  ProdutoJaPossuiQtdMaximaCategorias: ProdutoJaPossuiQtdMaximaCategorias,
  ProdutoJaPossuiCategoriaInformada: ProdutoJaPossuiCategoriaInformada,
  ProdutoJaPossuiQtdMinimaCategorias: ProdutoJaPossuiQtdMinimaCategorias,
  ProdutoNaoPossuiCategoriaInformada: ProdutoNaoPossuiCategoriaInformada
}