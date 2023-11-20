import { faker } from '@faker-js/faker'
import { IDEntityUUIDInvalid } from '@shared/domain/domain.exception'
import { beforeAll, describe, expect, test } from "vitest"
import { Categoria } from "./categoria.entity"
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from "./categoria.exception"
import { CreateCategoriaProps, RecoverCategoriaProps } from "./categoria.types"

let nomeCategoriaValida: string
let nomeCategoriaTamanhoMaximoInvalido: string
let nomeCategoriaTamanhoMinimoInvalido: string
let UUIDValido: string
let UUIDInvalido: string

describe('Entidade de Domínio: Categoria', () => {

    beforeAll(async () => {
        nomeCategoriaValida = faker.string.alpha({ length: { min: Categoria.TAMANHO_MINIMO_NOME, max: Categoria.TAMANHO_MAXIMO_NOME } })
        nomeCategoriaTamanhoMinimoInvalido = faker.string.alpha({ length: { min: Categoria.TAMANHO_MINIMO_NOME-1, max: Categoria.TAMANHO_MINIMO_NOME-1 } })
        nomeCategoriaTamanhoMaximoInvalido = faker.string.alpha({ length: { min: Categoria.TAMANHO_MAXIMO_NOME+1, max: Categoria.TAMANHO_MAXIMO_NOME+1 } })
        UUIDValido = faker.string.uuid()
        UUIDInvalido = faker.string.alpha({ length: { min: 1, max: 20 } })
    })

    describe('Categoria (create)', () => {

        test('Deve Criar Uma Categoria Válida - ', async () => {

            const categoriaValida: CreateCategoriaProps = {
                nome: nomeCategoriaValida
            }

            expect(Categoria.create(categoriaValida))
                .to.be.instanceOf(Categoria)
        })
    
        test('Não Deve Criar Categoria Com Nome Inválido - Tamanho Mínimo', () => {

            const categoriaInvalida: CreateCategoriaProps = {
                nome: nomeCategoriaTamanhoMinimoInvalido
            }

            expect(() => Categoria.create(categoriaInvalida))
                .toThrowError(NomeCategoriaTamanhoMinimoInvalido)
        })
    
        test('Não Deve Criar Categoria Com Nome Inválido - Tamanho Máximo', () => {

            const categoriaInvalida: CreateCategoriaProps = {
                nome: nomeCategoriaTamanhoMaximoInvalido
            }

            expect(() => Categoria.create(categoriaInvalida))
                .toThrowError(NomeCategoriaTamanhoMaximoInvalido)
        })
    })
    
    describe('Categoria (Recover)', () => {
    
        test('Deve Recuperar Uma Categoria Válida', async () => {
    
            const categoriaValida: RecoverCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaValida
            };
    
            expect(Categoria.recover(categoriaValida))
                .to.be.instanceof(Categoria)
    
        })
    
        test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {
    
            const categoriaIdInvalido: RecoverCategoriaProps = {
                id: UUIDInvalido,
                nome: nomeCategoriaValida
            };
    
            expect(() => Categoria.recover(categoriaIdInvalido))
                .toThrowError(IDEntityUUIDInvalid)
    
        })
    
        test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {
    
            const categoriaNomeInvalido: RecoverCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMinimoInvalido
            }
    
            expect(() => Categoria.recover(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMinimoInvalido)
    
        })
    
        test('Não Deve Recover Categoria Com Nome Inválido (Tamanho Máximo)', async () => {
    
            const categoriaNomeInvalido: RecoverCategoriaProps = {
                id: UUIDValido,
                nome: nomeCategoriaTamanhoMaximoInvalido
            }
    
            expect(() => Categoria.recover(categoriaNomeInvalido))
                .toThrowError(NomeCategoriaTamanhoMaximoInvalido)
    
        })
    })
})