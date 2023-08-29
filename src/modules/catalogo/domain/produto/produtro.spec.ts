import { CreateProdutoProps } from "./produto.types";
import { expect, describe, test, beforeAll} from "vitest";
import { Produto } from "./produto.entity";
import { NomeDescricaoTamanhoMaximoInvalido,
    NomeDescricaoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido, 
    QuantidadeCategoriasMaximoInvalido,
    QuantidadeCategoriasMinimoInvalido,
    ValorMinimoInvalido} from "./produto.exception";
import { Categoria } from "../categoria/categoria.entity";
import { faker } from '@faker-js/faker';

let nomeProdutoValido: string;
let nomeProdutoTamanhoMinimoInvalido: string;
let nomeProdutoTamanhoMaximoInvalido: string;
let descricaoProdutoValido: string;
let descricaoTamanhoMinimoInvalido: string;
let descricaoTamanhoMaximoInvalido: string;
let valorProdutoValido: number;
let valorMinimoInvalido: number;
let categoriasValidas: Categoria[];
let quantidadeCategoriasMinimoInvalido: Categoria[];
let quantidadeCategoriasMaximoInvalido: Categoria[];

beforeAll(async () => {
    nomeProdutoValido = faker.string.alpha({length:{min:5, max:50}});
    nomeProdutoTamanhoMinimoInvalido = faker.string.alpha({length:{min:0, max:4}});
    nomeProdutoTamanhoMaximoInvalido = faker.string.alpha({length:{min:51, max:51}});
    descricaoProdutoValido = faker.string.alpha({length:{min:10, max:200}});
    descricaoTamanhoMinimoInvalido = faker.string.alpha({length:{min:0, max:9}});
    descricaoTamanhoMaximoInvalido = faker.string.alpha({length:{min:201, max:201}});
    valorProdutoValido = faker.number.int({min:1,max:200});
    valorMinimoInvalido = faker.number.int({min:-10, max:0});
    const categoriaValida01 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida02 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida03 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida04 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});

    categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1, max:3});
    quantidadeCategoriasMinimoInvalido = [];
    quantidadeCategoriasMaximoInvalido = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], {min:4, max:4});
})

describe ('Entidade de Domínio: Produto (create)', () => {
    test('Deve Criar um Produto Válido - ', async () => {
        const categoria = Categoria.create({nome:'Qualquer'});
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
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoTamanhoMinimoInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Nome Inválido - Tamanho Máximo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoTamanhoMaximoInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido)
    })

    test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Mínimo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoTamanhoMinimoInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeDescricaoTamanhoMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Valor Inválido - Valor Mínimo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorMinimoInvalido,
            categorias: categoriasValidas
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(ValorMinimoInvalido)
    })

    test('Não Deve Criar Produto Com Descrição Inválido - Tamanho Máximo', () => {
        const categoria = Categoria.create({nome:'Qualquer'});
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoTamanhoMaximoInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(NomeDescricaoTamanhoMaximoInvalido)
    })

    test('Não Deve Criar Produto Com Categoria Inválido - Tamanho Mínimo', () => {
        const produtoInvalida: CreateProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: quantidadeCategoriasMinimoInvalido
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
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: quantidadeCategoriasMaximoInvalido
        }
        expect(() => Produto.create(produtoInvalida))
            .toThrowError(QuantidadeCategoriasMaximoInvalido)
    })
})