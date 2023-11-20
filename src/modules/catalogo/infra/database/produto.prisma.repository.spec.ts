import { PrismaClient } from "@prisma/client"
import { afterEach, beforeAll, describe, expect, test, vi } from "vitest"
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended"
import { ProdutoPrismaRepository } from "./produto.prisma.repository"
import { faker } from "@faker-js/faker"
import { Produto } from "@modules/catalogo/domain/produto/produto.entity"
import { ProdutoMap } from "../mappers/produto.map"
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types"
import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity"
import { CategoriaMap } from "../mappers/categoria.map"
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types"


const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>()
let produtoRepositorio: ProdutoPrismaRepository
let UUIDProdutoValido: string
let UUIDCategoriaValido: string
let UUIDProduto: string
let UUIDCategoria: string
let nomeProdutoValido: string
let nomeCategoriaValido: string
let descricaoProdutoValida: string
let valorProdutoValido: number
let categoriasProdutoValidas: Array<Categoria>
let dataCriacaoProduto: Date
let dataAtualizacaoProduto: Date
let dataCriacaoCategoria: Date
let dataAtualizacaoCategoria: Date
let dataCriacao: Date
let dataAtualizacao: Date
let dataExclusaoProduto: Date
let statusProdutoValido: StatusProduto
let categoriaOpcional: Categoria

describe('Repositório Prisma: Produto', () => {

    beforeAll(async () => {

        produtoRepositorio = new ProdutoPrismaRepository(prismaMock)

        const categoriaValida01 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})})
        const categoriaValida02 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})})
        categoriaOpcional = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})})

        UUIDProdutoValido = faker.string.uuid()
        UUIDCategoriaValido = faker.string.uuid()
        UUIDProduto = faker.string.uuid()
        UUIDCategoria = faker.string.uuid()
        nomeProdutoValido = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_NOME, max: Produto.TAMANHO_MAXIMO_NOME}})
        nomeCategoriaValido = faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})
        descricaoProdutoValida = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_DESCRICAO, max: Produto.TAMANHO_MAXIMO_DESCRICAO}})
        valorProdutoValido = faker.number.int({min: Produto.VALOR_MINIMO})
        categoriasProdutoValidas = faker.helpers.arrayElements([categoriaValida01, categoriaValida02], {min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MAXIMA_CATEGORIAS})
        dataCriacaoProduto = faker.date.anytime()
        dataAtualizacaoProduto = faker.date.anytime()
        dataCriacaoCategoria = faker.date.anytime()
        dataAtualizacaoCategoria = faker.date.anytime()
        dataExclusaoProduto = faker.date.anytime()
        statusProdutoValido = faker.helpers.enumValue(StatusProduto)
        
    })

    afterEach(() => {
        vi.restoreAllMocks()
        mockReset(prismaMock)
    })

    describe('Recuperar Produto por ID', () => {

        test('Deve Recuperar Produto por UUID', async () => {            
            
            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma)
            
            const produto: Produto = ProdutoMap.fromPrismaModeltoDomain(produtoPrisma)

            const produtoRecuperado = await produtoRepositorio.recoverByUuid(produto.id)

            expect(produtoRecuperado)
                .toEqual(produto)

            expect(prismaMock.produto.findUnique)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produto.findUnique)
                .toBeCalledWith({
                    where: {
                        id: produto.id
                    },
                    include: produtoIncludeCategoriaPrisma
                })
        })
    })

    describe('Recuperar Todos os Produtos', () => {

        test('Deve Recuperar Todos os Produtos Não Excluídos', async () => {

            const listaProdutosPrisma = [{
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            },{
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            }]

            prismaMock.produto.findMany.mockResolvedValue(listaProdutosPrisma)
            
            const produtos: Array<Produto> = listaProdutosPrisma.map((produto) => ProdutoMap.fromPrismaModeltoDomain(produto))

            const todosProdutosRecuperados = await produtoRepositorio.recoverAll()

            expect(todosProdutosRecuperados)
                .toStrictEqual(produtos)
            
            expect(prismaMock.produto.findMany)
                .toHaveBeenCalledTimes(1)
        })
    })

    describe('Existe Produto', () => {

        test('Deve Verificar se Existe Um Determinado Produto por UUID', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.findUnique.mockResolvedValue(produtoPrisma)

            const produto: Produto = ProdutoMap.fromPrismaModeltoDomain(produtoPrisma)

            const existeproduto = await produtoRepositorio.exists(produto.id)

            expect(existeproduto)
                .toBeTruthy()
        })
    })

    describe('Inserir Produto', () => {

        test('Deve Inserir Um Produto', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.create.mockResolvedValue(produtoPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const produtoInserida = await produtoRepositorio.insert(produto)

            expect(produtoInserida)
                .toStrictEqual(produto)

            expect(prismaMock.produto.create)
                .toHaveBeenCalledTimes(1)
            
            expect(prismaMock.produto.create)
                .toBeCalledWith({
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
        })
    })

    describe('Alterar Produto', () => {

        test('Deve Atualizar Uma Produto', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.update.mockResolvedValue(produtoPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const produtoAtualizado = await produtoRepositorio.update(produto.id, produto)

            expect(produtoAtualizado)
                .toBeTruthy()

            expect(prismaMock.produto.update)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produto.update)
                .toBeCalledWith({
                    where: { 
                        id: produto.id
                    },
                    data: {
                        nome: produto.nome,
                        descricao: produto.descricao,
                        valor: produto.valor
                    }
                })
        })
    })
    
    describe('Deletar Produto', () => {

        test('Deve Deletar Um Produto por UUID', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.update.mockResolvedValue(produtoPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const produtoDeletada = await produtoRepositorio.delete(produto.id)

            expect(produtoDeletada)
                .toBeTruthy()

            expect(prismaMock.produto.update)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produto.update)
                .toBeCalledWith({
                    where: { 
                        id: produto.id
                    },
                    data: {
                        dataExclusao: new Date()
                    }
                })
        })
    })

    describe('Adicionar Categoria ao Produto', () => {

        test('Deve Adicionar Uma Categoria a Um Determinado Produto', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            const produtosCategoriasPrisma = {
                produtoId: UUIDProdutoValido,
                categoriaId: UUIDCategoriaValido,
                dataCriacao: dataCriacaoCategoria,
                dataAtualizacao: dataAtualizacaoCategoria    
            }

            prismaMock.produtosCategorias.create.mockResolvedValue(produtosCategoriasPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const categoria: Categoria = CategoriaMap.toDomain(categoriaOpcional)

            const produtoCategoriaAdicionada = await produtoRepositorio.addCategoria(produto, categoria)

            expect(produtoCategoriaAdicionada)
                .toBeTruthy()

            expect(prismaMock.produtosCategorias.create)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produtosCategorias.create)
                .toBeCalledWith({
                    data: {
                        produtoId: produto.id,
                        categoriaId: categoria.id
                    }
                })
        })
    })

    describe('Remover Categoria do Produto', () => {

        test('Deve Remover Uma Categoria de Um Determinado Produto', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            const produtosCategoriasPrisma = {
                produtoId: UUIDProdutoValido,
                categoriaId: UUIDCategoriaValido,
                dataCriacao: dataCriacaoCategoria,
                dataAtualizacao: dataAtualizacaoCategoria    
            }

            prismaMock.produtosCategorias.delete.mockResolvedValue(produtosCategoriasPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const categoria: Categoria = CategoriaMap.toDomain(categoriaOpcional)

            const produtoCategoriaRemovida = await produtoRepositorio.removeCategoria(produto, categoria)

            expect(produtoCategoriaRemovida)
                .toBeTruthy()

            expect(prismaMock.produtosCategorias.delete)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produtosCategorias.delete)
                .toBeCalledWith({
                    where: {
                        produtoId_categoriaId: {
                            produtoId: produto.id,
                            categoriaId: categoria.id
                        }
                    }
                })
        })
    })

    describe('Alterar Status Produto', () => {

        test('Deve Alterar o Status do Produto', async () => {

            const produtoPrisma = {
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: categoriasProdutoValidas,
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: dataExclusaoProduto,
                status: statusProdutoValido
            }

            prismaMock.produto.update.mockResolvedValue(produtoPrisma)

            const produto: Produto = ProdutoMap.toDomain(produtoPrisma)

            const status = StatusProduto.DESATIVO

            const produtoStatusAlterado = await produtoRepositorio.alterStatus(produto, status)

            expect(produtoStatusAlterado)
                .toBeTruthy()

            expect(prismaMock.produto.update)
                .toHaveBeenCalledTimes(1)

            expect(prismaMock.produto.update)
                .toBeCalledWith({
                    where: {
                        id: produto.id
                    },
                    data: {
                        status: ProdutoMap.toStatusProdutoPrisma(status)
                    }
                })
        })
    })

    describe('Recuperar Todos os Produtos por Categoria', () => {

        test('Deve Recuperar Todos os Produtos por Categoria', async () => {

            const listaProdutosPrisma = [{
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            },{
                id: UUIDProdutoValido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValida,
                valor: valorProdutoValido,
                categorias: [{
                    categoria: {
                        id: UUIDCategoriaValido,
                        nome: nomeCategoriaValido,
                        dataCriacao: dataCriacaoCategoria,
                        dataAtualizacao: dataAtualizacaoCategoria
                    },
                        produtoId: UUIDProduto,
                        categoriaId: UUIDCategoria,
                        dataCriacao: dataCriacao,
                        dataAtualizacao: dataAtualizacao
                    }
                ],
                dataCriacao: dataCriacaoProduto,
                dataAtualizacao: dataAtualizacaoProduto,
                dataExclusao: null,
                status: StatusProduto.ATIVO
            }]

            prismaMock.produto.findMany.mockResolvedValue(listaProdutosPrisma)
            
            const produtos: Array<Produto> = listaProdutosPrisma.map((produto) => ProdutoMap.fromPrismaModeltoDomain(produto))

            const produtosPorCategoria = await produtoRepositorio.recoverByCategoria(UUIDCategoriaValido)

            expect(produtosPorCategoria)
                .toStrictEqual(produtos)
            
            expect(prismaMock.produto.findMany)
                .toHaveBeenCalledTimes(1)
        })
    })   
})