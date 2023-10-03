import { Prisma } from "@prisma/client";
import { Produto } from "../domain/produto/produto.entity";
import { IProduto, RecoverProdutoProps } from "../domain/produto/produto.types";

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

    // public static fromPrismaModeltoDomain(produto: Prisma.ProdutoCreateInput): Produto {
    //     return ProdutoMap.toDomain ({
    //         id: produto.id,
    //         nome: produto.nome,
    //         descricao: produto.descricao,
    //         valor: produto.valor,
    //         categorias: produto.categorias
    //     });
    // }
}