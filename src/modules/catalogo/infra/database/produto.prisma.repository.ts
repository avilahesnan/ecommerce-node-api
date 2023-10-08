import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { IProdutoRepository } from "@modules/catalogo/domain/produto/produto.repository.interface";
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

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
                dataExclusao: null
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

}