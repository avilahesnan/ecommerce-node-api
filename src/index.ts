import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { categoriaRepositorio, produtoRepositorio } from "@modules/catalogo/infra/database";
import { atualizarCategoriaUseCase, deletarCategoriaUseCase, inserirCategoriaUseCase, recupearProdutoPorIdUseCase, recuperarCategoriaPorIdUseCase, recuperarTodasCategoriasUseCase } from "@modules/catalogo/application/use-case";



async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgress Connected');
        }
    )

    /// Categoria ///

    //console.log(await recuperarCategoriaPorIdUseCase.execute("110d4541-1ef8-4fbc-94d4-f0d2f5fbcb6d"))

    //console.log(await recuperarTodasCategoriasUseCase.execute())
    
    //console.log(await inserirCategoriaUseCase.execute({nome: 'Cama'}))

    // console.log(await atualizarCategoriaUseCase.execute({
    //     id: '110d4541-1ef8-4fbc-94d4-f0d2f5fbcb6d',
    //     nome: 'mesa'
    // }))

    //console.log(await deletarCategoriaUseCase.execute("110d4541-1ef8-4fbc-94d4-f0d2f5fbcb6d"))

    
    /// Produto ///

    console.log(await recupearProdutoPorIdUseCase.execute("9fbd3b52-5200-45d8-a5df-d86a92c970f2"))

    //const produto: Produto = Produto.create({nome: 'toalha', descricao: 'toalha de banho', valor: 50, categorias: []})

    // const produtoRecu = Produto.recover({
    //     id: "9fbd3b52-5200-45d8-a5df-d86a92c970f2",
    //     nome: "toalha",
    //     descricao: "toalha de banho",
    //     valor: 100,
    //     categorias: [categoriaRecu]
    // })

    //const produtoInse = await produtoRepositorio.insert()

    //const prdotutoExi: boolean = await produtoRepositorio.exists("")

    //const produtoUp: boolean = await produtoRepositorio.update(produtoRecu.id, produtoRecu)

    //const produtoDel: boolean = await produtoRepositorio.delete("")

    //const produtoAll: Array<Produto> = await produtoRepositorio.recoverAll()

    
    //console.log(produtoRecuId)
    //console.log(produtoRecu)
    //console.log(produtoInse)
    //console.log(prdotutoExi)
    //console.log(produtoUp)
    //console.log(produtoDel)
    //console.log(produtoAll)

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