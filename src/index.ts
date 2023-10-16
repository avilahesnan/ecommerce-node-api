import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { DomainException } from "@shared/domain/domain.exception";
import { prisma } from "@main/infra/database/orm/prisma/client";
import { categoriaRepositorio, produtoRepositorio } from "@modules/catalogo/infra/database";

async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgress Connected');
        }
    );

    /// Categoria ///

    //const categoriaRecuId: Categoria | null = await categoriaRepositorio.recoverByUuid("")

    //const categoria: Categoria = Categoria.create({ nome: 'banho'})

    // const categoriaRecu = Categoria.recover({
    //     id: "d48bb575-100d-40f4-b906-38a9d9cbb3c8",
    //     nome: "banho"
    // })

    //const categoriaInse = await categoriaRepositorio.insert(categoria)
    
    //const categoriaExi: boolean = await categoriaRepositorio.exists("")

    //const categoriaUp: boolean = await categoriaRepositorio.update(.id,)
    
    //const categoriaDel: boolean = await categoriaRepositorio.delete("")
    
    //const categoriaAll: Array<Categoria> = await categoriaRepositorio.recoverAll()
    
    /// Produto ///

    //const produtoRecuId: Produto | null = await produtoRepositorio.recoverByUuid("")

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


    //console.log(categoriaRecuId)
    //console.log(categoriaRecu)
    //console.log(categoriaInse)
    //console.log(categoriaExi)
    //console.log(categoriaUp)
    //console.log(categoriaDel)
    //console.log(categoriaAll)
    
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