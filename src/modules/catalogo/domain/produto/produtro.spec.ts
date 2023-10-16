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
let categoriasValidas: Categoria[];
let quantidadeCategoriasMinimoInvalido: Categoria[];
let quantidadeCategoriasMaximoInvalido: Categoria[];
let UUIDvalido: string;
let categoirasQtdValidaAptaAdicao: Array<Categoria>;
let categoirasQtdMaxValidaInaptaAdicao: Array<Categoria>;
let categoirasQtdValidaInaptaAdicaoDuplicacao: Array<Categoria>;
let categoriaQtdValidaAptaRemocao: Array<Categoria>;
let categoriaQtdMinValidaInaptaRemocao: Array<Categoria>;
let categoriaQtdValidaInaptaRemocaoNaoAssociado: Array<Categoria>;

beforeAll(async () => {
    nomeProdutoValido = faker.string.alpha({length:{min:5, max:50}});
    nomeProdutoTamanhoMinimoInvalido = faker.string.alpha({length:{min:0, max:4}});
    nomeProdutoTamanhoMaximoInvalido = faker.string.alpha({length:{min:51, max:51}});
    descricaoProdutoValido = faker.string.alpha({length:{min:10, max:200}});
    descricaoTamanhoMinimoInvalido = faker.string.alpha({length:{min:0, max:9}});
    descricaoTamanhoMaximoInvalido = faker.string.alpha({length:{min:201, max:201}});
    valorProdutoValido = faker.number.int({min:1,max:200});
    valorMinimoInvalido = faker.number.int({min:-10, max:-1});
    const categoriaValida01 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida02 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida03 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});
    const categoriaValida04 = Categoria.create({nome:faker.string.alpha({length:{min:3, max:50}})});

    categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1, max:3});
    quantidadeCategoriasMinimoInvalido = [];
    quantidadeCategoriasMaximoInvalido = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], {min:4, max:4});
    categoirasQtdValidaAptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02], {min:1, max:2});
    categoirasQtdMaxValidaInaptaAdicao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min:3, max:3});
    categoirasQtdValidaInaptaAdicaoDuplicacao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02], {min:1, max:2});
    categoriaQtdValidaAptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min:2, max:3});
    categoriaQtdMinValidaInaptaRemocao = faker.helpers.arrayElements<Categoria>([categoriaValida01], {min:1, max:1});
    categoriaQtdValidaInaptaRemocaoNaoAssociado = faker.helpers.arrayElements<Categoria>([categoriaValida01, categoriaValida02, categoriaValida03], {min:2, max:3});

    UUIDvalido = faker.string.uuid();
})

describe('Entidade de Domínio: Produto', () => {

    describe('Produto (create)', () => { 
        
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
                .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMinimoInvalido)
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
                .toThrowError(ProdutoExceptions.NomeProdutoTamanhoMaximoInvalido)
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
                .toThrowError(ProdutoExceptions.NomeDescricaoTamanhoMinimoInvalido)
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
                .toThrowError(ProdutoExceptions.ValorMinimoInvalido)
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
                .toThrowError(ProdutoExceptions.NomeDescricaoTamanhoMaximoInvalido)
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
        });

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
        });

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

});