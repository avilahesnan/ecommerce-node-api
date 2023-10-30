import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "@modules/catalogo/infra/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

export class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    
    async recoverByUuid(uuid: string): Promise<Produto | null> {
        const produtoRecuperado = await this._datasource.produto.findUnique({
            where: {
                id: uuid
            },
            include: produtoIncludeCategoriaPrisma
        })
        if (produtoRecuperado) {
            return ProdutoMap.fromPrismaModeltoDomain(produtoRecuperado)
        }
        return null
    }
    
    async recoverAll(): Promise<Produto[]> {
        const produtosRecuperados = await this._datasource.produto.findMany({
            where: {
                dataExclusao: null,
                status: StatusProduto.ATIVO
            },
            include: produtoIncludeCategoriaPrisma
        })
        const produtos: Array<Produto> = []

        if (produtosRecuperados.length > 0) {
            produtosRecuperados.map(
                (produto) => {
                    produtos.push(ProdutoMap.fromPrismaModeltoDomain(produto))
                }
            )
        }
        return produtos
    }
    
    async exists(uuid: string): Promise<boolean> {
        const produtoExistente = await this.recoverByUuid(uuid)
        if (produtoExistente) {
            return true
        }
        return false
    }
    
    async insert(produto: Produto): Promise<Produto> {
        const produtoInserido = await this._datasource.produto.create({
            data: {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: { 
                    create: produto.categorias.map((categoria) => {
                        return {
                            categoriaId: categoria.id
                        }
                    }) 
                }
            }
        })
        return produto
    }
    
    async update(uuid: string, produto: Produto): Promise<boolean> {
        const produtoAtualizado = await this._datasource.produto.update({
            where: {
                id: uuid
            },
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor
            }
        })
        if (produtoAtualizado) {
            return true
        }
        return false
    }
    
    async delete(uuid: string): Promise<boolean> {
        const produtoDeletado = await this._datasource.produto.update({
            where: {
                id: uuid
            },
            data: {
                dataExclusao: new Date()
            }
        })
        if(produtoDeletado.id) {
            return true
        }
        return false
    }

    async addCategoria(produto: Produto, categoria: Categoria): Promise<boolean> {
        const categoriaProdutoAdicionado = await this._datasource.produtosCategorias.create({
            data: {
                produtoId: produto.id,
                categoriaId: categoria.id
            }
        })
        if (categoriaProdutoAdicionado) {
            return true
        }
        return false
    }

    async removeCategoria(produto: Produto, categoria: Categoria): Promise<boolean> {
        
        const categoriaProdutoRemovida = await this._datasource.produtosCategorias.delete({
            where: {
                produtoId_categoriaId: {
                    produtoId: produto.id,
                    categoriaId: categoria.id
                }
            }
        })
        if (categoriaProdutoRemovida) {
            return true
        }
        return false
    }

    async alterStatus(produto: Produto, status: StatusProduto): Promise<boolean> {
        
        const produtoStatusAlterado = await this._datasource.produto.update({
            where: {
                id: produto.id
            },
            data: {
                status: ProdutoMap.toStatusProdutoPrisma(status)
            }
        })
        if (produtoStatusAlterado.id) {
            return true
        }
        return false
    }

    async recoverByCategoria(idCategoria: string): Promise<Produto[]> {
        
        const produtosPorCategoriasRecuperadas = await this._datasource.produto.findMany({
            where: {
                dataExclusao: null,
                status: StatusProduto.ATIVO,
                AND: [{
                    categorias: {
                        some: {
                            categoriaId: idCategoria
                        }
                    }
                }]
            },
            include: produtoIncludeCategoriaPrisma
        })

        const produtos: Array<Produto> = []

        if (produtosPorCategoriasRecuperadas.length > 0) {
            produtosPorCategoriasRecuperadas.map((produto) => {
                produtos.push(ProdutoMap.fromPrismaModeltoDomain(produto))
            })
        }
        return produtos
    }

}