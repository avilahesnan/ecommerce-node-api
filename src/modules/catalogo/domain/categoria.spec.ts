import { describe, expect, test } from "vitest";
import { CreateCategoriaProps, RecoverCategoriaProps } from "./categoria.types";
import { Categoria } from "./categoria.entity";
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception";
import { IDEntityUUIDInvalid } from "../../../shared/domain/domain.exception";

describe ('Entidade de Domínio: Categoria (create)', () => {
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

describe ('Entidade de Domínio: Categoria (Recover)', () => {

    test('Deve Recuperar Uma Categoria Válida', async () => {

        const categoriaValida: RecoverCategoriaProps = {
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: 'cama'
        };

        expect(Categoria.recover(categoriaValida))
            .to.be.instanceof(Categoria);

    });

    test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {

        const categoriaIdInvalido: RecoverCategoriaProps = {
            id: '1234',
            nome: 'cama'
        };

        expect(() => Categoria.recover(categoriaIdInvalido))
            .toThrowError(IDEntityUUIDInvalid);

    });

    test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

        const categoriaNomeInvalido: RecoverCategoriaProps = {
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: 'ma'
        };

        expect(() => Categoria.recover(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

    });

    test('Não Deve Recover Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

        const categoriaNomeInvalido: RecoverCategoriaProps = {
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: '123456789123456789123456789123456789123456789123456'
        };

        expect(() => Categoria.recover(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

    });

});