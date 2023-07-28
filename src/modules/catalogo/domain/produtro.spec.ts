import { CreateProdutoProps } from "./produto.types";
import { expect, describe, test} from "vitest";
import { Produto } from "./produto.entity";
import { NomeDescricaoTamanhoMaximoInvalido,
    NomeDescricaoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido, 
    QuantidadeCategoriasMaximoInvalido,
    QuantidadeCategoriasMinimoInvalido,
    ValorMinimoInvalido} from "./produto.exception";
import { Categoria } from "./categoria.entity";

describe ('Entidade de Domínio: Produto (create)', () => {
    test('Deve Criar um Produto Válido - ', async () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoValido: CreateProdutoProps = {
            nome: 'Geladeira',
            descricao: 'Uma Geladeira muito boa',
            valor: 2000,
            categoria: [categoria]
        }
        expect(Produto.create(produtoValido))
            .to.be.instanceOf(Produto)
    });
    
    test('Não Deve Criar Produto Com Nome Inválido - Tamanho Mínimo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'Alli',
            descricao: 'Uma Geladeira muito boa',
            valor: 2000,
            categoria: [categoria]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Nome Inválido - Tamanho Máximo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            descricao: 'Uma Geladeira muito boa',
            valor: 2000,
            categoria: [categoria]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido)
    })

    test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Mínimo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'AllioFAF',
            descricao: '123456789',
            valor: 2000,
            categoria: [categoria]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeDescricaoTamanhoMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Valor Inválido - Valor Mínimo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'AllioFAF',
            descricao: '12345678910',
            valor: -1,
            categoria: [categoria]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(ValorMinimoInvalido)
    })


    test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Máximo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'byyfftvgh',
            descricao: 'UmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUmaGeladeiramuitoboaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            valor: 2000,
            categoria: [categoria]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeDescricaoTamanhoMaximoInvalido)
    })

    test('Não Deve Criar Produto Com Categoria Inválido - Tamanho Mínimo', () => {
        const produtoInvalida: CreateProdutoProps = {
            nome: 'aaaaaaa',
            descricao: 'Uma Geladeira muito boa',
            valor: 2000,
            categoria: []
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(QuantidadeCategoriasMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Categoria Inválido - Tamanho Máximo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const categoria1 = Categoria.create({nome:'alimento'});
        const categoria2 = Categoria.create({nome:'comida'});
        const categoria3 = Categoria.create({nome:'coisas'});
        const produtoInvalida: CreateProdutoProps = {
            nome: 'AAAAAAAAA',
            descricao: 'Uma Geladeira muito boa',
            valor: 2000,
            categoria: [categoria, categoria1, categoria2, categoria3]
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(QuantidadeCategoriasMaximoInvalido)
    })
})