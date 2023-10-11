import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

export class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    
    async recoverByUuid(uuid: string): Promise<Produto | null> {
        const produtoRecovered = await this._datasource.produto.findUnique({
            where: {
                id: uuid
            },
            include: produtoIncludeCategoriaPrisma
        })
        if (produtoRecovered) {
            return ProdutoMap.fromPrismaModeltoDomain(produtoRecovered)
        }
        return null
    }
    
    async recoverAll(): Promise<Produto[]> {
        const produtoRecovereds = await this._datasource.produto.findMany({
            where: {
                dataExclusao: null,
                status: StatusProduto.ATIVO
            },
            include: produtoIncludeCategoriaPrisma
        })
        const produtos: Array<Produto> = []

        if (produtos.length > 0) {
            produtoRecovereds.map(
                (produto) => {
                    produtos.push(ProdutoMap.fromPrismaModeltoDomain(produto))
                }
            )
        }
        return produtos
    }
    
    async exists(uuid: string): Promise<boolean> {
        const produtoExisting = await this.recoverByUuid(uuid)
        if (produtoExisting) {
            return true
        }
        return false
    }
    
    async insert(produto: Produto): Promise<Produto> {
        const produtoInsered = await this._datasource.produto.create({
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
        const produtoUpdated = await this._datasource.produto.update({
            where: {
                id: uuid
            },
            data: {
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor
            }
        })
        if (produtoUpdated) {
            return true
        }
        return false
    }
    
    async delete(uuid: string): Promise<boolean> {
        const produtodeleted = await this._datasource.produto.update({
            where: {
                id: uuid
            },
            data: {
                dataExclusao: new Date()
            }
        })
        if(produtodeleted.id) {
            return true
        }
        return false
    }

    async addCategoria(produto: Produto, categoria: Categoria): Promise<boolean> {
        const categoriaProdutoAdd = await this._datasource.produtosCategorias.create({
            data: {
                produtoId: produto.id,
                categoriaId: categoria.id
            }
        })
        if (categoriaProdutoAdd) {
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
        
        const produtosByCategoriasRecovered = await this._datasource.produto.findMany({
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

        if (produtosByCategoriasRecovered.length > 0) {
            produtosByCategoriasRecovered.map((produto) => {
                produtos.push(ProdutoMap.fromPrismaModeltoDomain(produto))
            })
        }
        return produtos;
    }

}