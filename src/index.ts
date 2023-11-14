import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { categoriaRepositorio, produtoRepositorio } from "@modules/catalogo/infra/database";
import { adicionarCategoriaProdutoUseCase, alterarStatusProdutoUseCase, atualizarCategoriaUseCase, atualizarProdutoUseCase, deletarCategoriaUseCase, deletarProdutoUseCase, inserirCategoriaUseCase, inserirProdutoUseCase, recupearProdutoPorIdUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutosPorCategoriaUseCase, recuperarTodasCategoriasUseCase, recuperarTodosProdutosUseCase, removerCategoriaProdutoUseCase } from "@modules/catalogo/application/use-case";



async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgress Connected');
        }
    )

    ////////////////
    /// Category ///
    ////////////////

    /// Recover Category By Id ///

    //console.log(await recuperarCategoriaPorIdUseCase.execute("8780ae8d-0d56-43d0-a45b-1a1143bb324f"))

    /// Recover All Categories ///

    //console.log(await recuperarTodasCategoriasUseCase.execute())

    /// Insert Category ///

    //console.log(await inserirCategoriaUseCase.execute({nome: 'Cama'}))

    /// Update Category ///

    // console.log(await atualizarCategoriaUseCase.execute({
    //     id: '110d4541-1ef8-4fbc-94d4-f0d2f5fbcb6d',
    //     nome: 'mesa'
    // }))

    /// Delele Category (Hard Delete) ///

    //console.log(await deletarCategoriaUseCase.execute("110d4541-1ef8-4fbc-94d4-f0d2f5fbcb6d"))

    ///////////////
    /// Product ///
    ///////////////

    /// Variables ///

    // let categoria01 = await recuperarCategoriaPorIdUseCase.execute("8780ae8d-0d56-43d0-a45b-1a1143bb324f")
    // let categoria02 = await recuperarCategoriaPorIdUseCase.execute("d48bb575-100d-40f4-b906-38a9d9cbb3c8")

    /// Recover Product By Id ///

    //console.log(await recupearProdutoPorIdUseCase.execute("9fbd3b52-5200-45d8-a5df-d86a92c970f2"))

    /// Recover All Product ///

    //console.log(await recuperarTodosProdutosUseCase.execute())
    
    /// Insert Product ///

    // console.log(await inserirProdutoUseCase.execute({nome: 'Iphone', descricao: 'Um ótimo smartphone', valor: 3, categorias: [categoria01]}))

    /// Update Product ///

    // console.log(await atualizarProdutoUseCase.execute({
    //     id: "9fbd3b52-5200-45d8-a5df-d86a92c970f2",
    //     nome: 'Iphone 16',
    //     descricao: 'Um ótimo smartphone',
    //     valor: 3,
    //     categorias: [categoria01]
    // }))

    /// Delete Product (Soft Delete) ///
    
    //console.log(await deletarProdutoUseCase.execute("d82d82fc-b06f-4e33-b932-52f66afe3270"))

    /// Add Category Product ///

    // console.log(await adicionarCategoriaProdutoUseCase.execute({
    //     id: "9fbd3b52-5200-45d8-a5df-d86a92c970f2",
    //     nome: "Iphone 16",
    //     descricao: "Um ótimo smartphone",
    //     valor: 3,
    //     categorias: [categoria01]
    // }))

    /// Remove Category Product ///

    // console.log(await removerCategoriaProdutoUseCase.execute({
    //     id: "d82d82fc-b06f-4e33-b932-52f66afe3270",
    //     nome: "Iphone",
    //     descricao: "Um ótimo smartphone",
    //     valor: 3,
    //     categorias: [categoria01]
    // }))

    /// Alter Status Product ///

    // console.log(await alterarStatusProdutoUseCase.execute({
    //     id: "9fbd3b52-5200-45d8-a5df-d86a92c970f2",
    //     nome: 'Iphone 16',
    //     descricao: 'Um ótimo smartphone',
    //     valor: 3,
    //     categorias: [categoria02]
    // }))

    /// Recover Product By Category ///

    // console.log(await recuperarProdutosPorCategoriaUseCase.execute("8780ae8d-0d56-43d0-a45b-1a1143bb324f"))


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        if (error instanceof DomainException) {
            console.log('Execeção de Domínio');
            console.log(error.message);
        }
        else {
            console.log('Outras Execeções');
            console.log(error.message)
        }
        await prisma.$disconnect()
        process.exit(1)
    })