import { RecoverProdutoProps } from "../domain/produto/produto.types";
import { Produto } from "../domain/produto/produto.entity";
import { IProduto } from "../domain/produto/produto.types";

export class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categorias: produto.categorias
        }
    }

    public static toDomain(produto: RecoverProdutoProps): Produto {
        return Produto.recover(produto)
    }

}