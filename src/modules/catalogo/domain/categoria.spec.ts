import { describe, expect, test } from "vitest";
import { CreateCategoriaProps } from "./categoria.types";
import { Categoria } from "./categoria.entity";
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception";

describe ('Entidade de Domínio da Categoria', () => {
    test('Deve Criar Uma Categoria Válida - ', async () => {
        const categoriaValida: CreateCategoriaProps = {
            nome: 'Alimento'
        }
        expect(Categoria.create(categoriaValida))
            .to.be.instanceOf(Categoria)
    });

    test('Não Deve Criar Categoria Com Nome Inválido - Tamanho Mínimo', () => {
        const categoriaInvalida: CreateCategoriaProps = {
            nome: 'Al'
        }
        expect(() => Categoria.create(categoriaInvalida))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido)
    })

    test('Não Deve Criar Categoria Com Nome Inválido - Tamanho Máximo', () => {
        const categoriaInvalida: CreateCategoriaProps = {
            nome: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'
        }
        expect(() => Categoria.create(categoriaInvalida))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido)
    })
});