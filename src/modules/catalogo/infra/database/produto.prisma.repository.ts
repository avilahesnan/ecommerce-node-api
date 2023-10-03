import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";

export class ProdutoPrismaRepository extends PrismaRepository implements IProdutoRepository<Produto> {
    
    async recoverByCategorias(categoria: { id: string; nome: string; dataCriacao: Date; dataAtualizacao: Date; }[]): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    
    async addCategoria(categoria: { id: string; nome: string; dataCriacao: Date; dataAtualizacao: Date; }): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    
    async recoverByUuid(uuid: string): Promise<Produto | null> {
        const produtoRecovered = await this._datasource.produto.findUnique({
            where: {
                id: uuid
            },
            include: {
                categorias: {
                    include: {
                        categoria: true
                    }
                }
            }
        })
        if (produtoRecovered) {
            return ProdutoMap.toDomain({
                id: produtoRecovered.id,
                nome: produtoRecovered.nome,
                descricao: produtoRecovered.descricao,
                valor: produtoRecovered.valor,
                categorias: produtoRecovered.categorias.map((categorias) => {
                    return Categoria.recover({
                        id: categorias.produtoId,
                        nome: categorias.categoria.nome
                    })
                })
            })
        }
        return null
    }
    
    async recoverAll(): Promise<Produto[]> {
        const produtoRecovereds = await this._datasource.produto.findMany()
        const produtos = produtoRecovereds.map(
            (produto) => ProdutoMap.toDomain({
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: produto.categorias.map((categorias) => {
                    return Categoria.recover({
                        id: categorias.produtoId,
                        nome: categorias.categoria.nome
                    })
                })
            })
        )
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
                            categoriaId: categoria.id,
                            categoriaNome: categoria.nome
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
            data: ProdutoMap.toDTO(produto)
        })
        if (produtoUpdated) {
            return true
        }
        return false
    }
    
    async delete(uuid: string): Promise<boolean> {
        const produtodeleted = await this._datasource.produto.delete({
            where: {
                id: uuid
            }
        })
        if(produtodeleted.id) {
            return true
        }
        return false
    }

}