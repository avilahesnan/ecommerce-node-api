import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from "vitest";
import { Categoria } from "../categoria/categoria.entity";
import { Produto } from "./produto.entity";
import { ProdutoExceptions } from "./produto.exception";
import { CreateProdutoProps } from "./produto.types";

let nomeProdutoValido: string;
let nomeProdutoTamanhoMinimoInvalido: string;
let nomeProdutoTamanhoMaximoInvalido: string;
let descricaoProdutoValido: string;
let descricaoTamanhoMinimoInvalido: string;
let descricaoTamanhoMaximoInvalido: string;
let valorProdutoValido: number;
let valorMinimoInvalido: number;
let categoriasValidas: Array<Categoria>;
let quantidadeCategoriasMinimoInvalido: Array<Categoria>;
let quantidadeCategoriasMaximoInvalido: Array<Categoria>;
let UUIDvalido: string;
let categoirasQtdValidaAptaAdicao: Array<Categoria>;
let categoirasQtdMaxValidaInaptaAdicao: Array<Categoria>;
let categoirasQtdValidaInaptaAdicaoDuplicacao: Array<Categoria>;
let categoriaQtdValidaAptaRemocao: Array<Categoria>;
let categoriaQtdMinValidaInaptaRemocao: Array<Categoria>;
let categoriaQtdValidaInaptaRemocaoNaoAssociado: Array<Categoria>;

describe('Entidade de Domínio: Produto', () => {

    beforeAll(async () => {

        const categoriaValida01 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})});
        const categoriaValida02 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})});
        const categoriaValida03 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})});
        const categoriaValida04 = Categoria.create({nome:faker.string.alpha({length:{min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME}})});
    
        UUIDvalido = faker.string.uuid();
        nomeProdutoValido = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_NOME, max: Produto.TAMANHO_MAXIMO_NOME}});
        nomeProdutoTamanhoMinimoInvalido = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_NOME-1, max: Produto.TAMANHO_MINIMO_NOME-1}});
        nomeProdutoTamanhoMaximoInvalido = faker.string.alpha({length:{min: Produto.TAMANHO_MAXIMO_NOME+1, max: Produto.TAMANHO_MAXIMO_NOME+1}});
        descricaoProdutoValido = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_DESCRICAO, max: Produto.TAMANHO_MAXIMO_DESCRICAO}});
        descricaoTamanhoMinimoInvalido = faker.string.alpha({length:{min: Produto.TAMANHO_MINIMO_DESCRICAO-1, max: Produto.TAMANHO_MINIMO_DESCRICAO-1}});
        descricaoTamanhoMaximoInvalido = faker.string.alpha({length:{min: Produto.TAMANHO_MAXIMO_DESCRICAO+1, max: Produto.TAMANHO_MAXIMO_DESCRICAO+1}});
        valorProdutoValido = faker.number.int({min: Produto.VALOR_MINIMO, max: Produto.VALOR_MINIMO});
        valorMinimoInvalido = faker.number.int({min: Produto.VALOR_MINIMO-1,max: Produto.VALOR_MINIMO-1});
        categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MAXIMA_CATEGORIAS});
        quantidadeCategoriasMinimoInvalido = [];
        quantidadeCategoriasMaximoInvalido = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], {min: Produto.QTD_MAXIMA_CATEGORIAS+1, max: Produto.QTD_MAXIMA_CATEGORIAS+1});
        categoirasQtdValidaAptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02], {min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MAXIMA_CATEGORIAS-1});
        categoirasQtdMaxValidaInaptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min: Produto.QTD_MAXIMA_CATEGORIAS, max: Produto.QTD_MAXIMA_CATEGORIAS});
        categoirasQtdValidaInaptaAdicaoDuplicacao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02], {min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MINIMA_CATEGORIAS+1});
        categoriaQtdValidaAptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min: Produto.QTD_MINIMA_CATEGORIAS+1, max: Produto.QTD_MAXIMA_CATEGORIAS});
        categoriaQtdMinValidaInaptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01], {min: Produto.QTD_MINIMA_CATEGORIAS, max: Produto.QTD_MINIMA_CATEGORIAS});
        categoriaQtdValidaInaptaRemocaoNaoAssociado = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min: Produto.QTD_MINIMA_CATEGORIAS+1, max: Produto.QTD_MAXIMA_CATEGORIAS});
    
    })

    describe('Produto (create)', () => { 
        
        test('Deve Criar um Produto Válido - ', async () => {

            const produtoValido: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriasValidas
            }

            expect(Produto.create(produtoValido))
                .to.be.instanceOf(Produto)
        });
        
        test('Não Deve Criar Produto Com Nome Inválido - Tamanho Mínimo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoTamanhoMinimoInvalido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriasValidas
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido)
        })

        test('Não Deve Criar Produto Com Nome Inválido - Tamanho Máximo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoTamanhoMaximoInvalido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriasValidas
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido)
        })

        test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Mínimo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoTamanhoMinimoInvalido,
                valor: valorProdutoValido,
                categorias: categoriasValidas
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.NomeDescricaoTamanhoMinimoInvalido)
        })

        test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Máximo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoTamanhoMaximoInvalido,
                valor: valorProdutoValido,
                categorias: categoriasValidas
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.NomeDescricaoTamanhoMaximoInvalido)
        })

        test('Não Deve Criar Produto Com Valor Inválido - Valor Mínimo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorMinimoInvalido,
                categorias: categoriasValidas
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.ValorMinimoInvalido)
        })

        test('Não Deve Criar Produto Com Categoria Inválido - Tamanho Mínimo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: quantidadeCategoriasMinimoInvalido
            }

            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.QuantidadeCategoriasMinimoInvalido)
        })

        test('Não Deve Criar Produto Com Categoria Inválido - Tamanho Máximo', () => {

            const produtoInvalida: CreateProdutoProps = {
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: quantidadeCategoriasMaximoInvalido
            }
            
            expect(() => Produto.create(produtoInvalida))
                .toThrowError(ProdutoExceptions.QuantidadeCategoriasMaximoInvalido)
        })  
    })

    describe('Produto (add Categoria)', () => {

        test('Deve Adicionar Uma Categoria Válida a Um Produto Válido Apto a Ter Uma Nova Categoria', async () => {
            
            const produtoValidoAptoNovaCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoirasQtdValidaAptaAdicao
            });

            const categoriaValida = Categoria.create({nome:faker.string.alpha({length:{min:3,max:50}})});

            expect(produtoValidoAptoNovaCategoria.addCategoria(categoriaValida))
                .toBe(categoriaValida);
            
            expect(produtoValidoAptoNovaCategoria.categorias)
                .toContain(categoriaValida);
        })

        test('Não Deve Adicionar Uma Categoria Válida a Um Produto Válido Inapto a Ter Uma Nova Categoria - Quantidade Máxima de Categorias', async () => {
            
            const produtoValidoInaptoNovaCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoirasQtdMaxValidaInaptaAdicao
            });

            const categoriaValida = Categoria.create({nome:faker.string.alpha({length:{min:3,max:50}})});

            expect(() => produtoValidoInaptoNovaCategoria.addCategoria(categoriaValida))
                .toThrowError(ProdutoExceptions.ProdutoJaPossuiQtdMaximaCategorias);
        })

        test('Não Deve Adicionar Uma Categoria Válida a Um Produto Válido Inapto a Ter Uma Nova Categoria - Categoria Já Adicionada', async () => {
            
            const produtoValidoInaptoNovaCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoirasQtdValidaInaptaAdicaoDuplicacao
            });

            const categoriaValida = categoirasQtdValidaInaptaAdicaoDuplicacao[0];

            expect(() => produtoValidoInaptoNovaCategoria.addCategoria(categoriaValida))
                .toThrowError(ProdutoExceptions.ProdutoJaPossuiCategoriaInformada);
        })
    })

    describe('Produto (remove Categoria)', () => {

        test('Deve Remover Uma Categoria Válida de Um Produto Válido Apto a Ter Uma Categoria Removida', async () => {
            
            const produtoValidoAptoRemoverCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriaQtdValidaAptaRemocao
            })

            const categoriaValida = categoriaQtdValidaAptaRemocao[0]

            expect(produtoValidoAptoRemoverCategoria.removeCategoria(categoriaValida))
                .toBe(categoriaValida)

            expect(produtoValidoAptoRemoverCategoria.categorias)
                .not.toContain(categoriaValida)
        })

        test('Não Deve Remover Uma Categoria Válida de Um Produto Válido Inapto a Ter Uma Categoria Removida - Quantidade Mínima de Categoria',async () => {
            
            const produtoValidoInaptoRemoverCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriaQtdMinValidaInaptaRemocao
            })

            const categoriaValida = categoriaQtdMinValidaInaptaRemocao[0]

            expect(() => produtoValidoInaptoRemoverCategoria.removeCategoria(categoriaValida))
                .toThrowError(ProdutoExceptions.ProdutoJaPossuiQtdMinimaCategorias)
        })

        test('Não Deve Remover Uma Categoria Válida de Um Produto Válido Inapto a Ter Uma Categoria Removida - Categoria Não Associado ao Produto',async () => {
            
            const produtoValidoInaptoRemoverCategoria: Produto = Produto.recover({
                id: UUIDvalido,
                nome: nomeProdutoValido,
                descricao: descricaoProdutoValido,
                valor: valorProdutoValido,
                categorias: categoriaQtdValidaInaptaRemocaoNaoAssociado
            })

            const categoriaValida = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})})

            expect(() => produtoValidoInaptoRemoverCategoria.removeCategoria(categoriaValida))
                .toThrowError(ProdutoExceptions.ProdutoNaoPossuiCategoriaInformada)
        })
    })

})