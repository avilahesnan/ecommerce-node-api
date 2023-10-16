import { Produto } from "../../domain/produto/produto.entity";
import { IProduto, RecoverProdutoProps, StatusProduto } from "../../domain/produto/produto.types";
import { ProdutoWithCategoriaPrisma } from "@shared/infra/database/prisma.types";
import { Categoria } from "../../domain/categoria/categoria.entity";
import { CategoriaMap } from "./categoria.map";
import { StatusProdutoPrisma } from "@prisma/client";

export class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categorias: produto.categorias,
            dataCriacao: produto.dataCriacao,
            dataAtualizacao: produto.dataAtualizacao,
            dataExclusao: produto.dataExclusao,
            status: produto.status
        }
    }

    public static toDomain(produto: RecoverProdutoProps): Produto {
        return Produto.recover(produto)
    }

    public static fromPrismaModeltoDomain(produto: ProdutoWithCategoriaPrisma): Produto {
        
        const categorias:  Array<Categoria> = []

        produto.categorias.map((categoria) => {
            categorias.push(CategoriaMap.fromPrismaModeltoDomain(categoria.categoria))
        })

        return this.toDomain({
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categorias: categorias,
            dataCriacao: produto.dataCriacao,
            dataAtualizacao: produto.dataAtualizacao,
            dataExclusao: produto.dataExclusao,
            status: StatusProduto[produto.status]
        })
    }

    public static toStatusProdutoPrisma(status: StatusProduto): StatusProdutoPrisma {
        return StatusProdutoPrisma[status.toString() as keyof typeof StatusProdutoPrisma]
    }
    
}