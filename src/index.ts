import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
import { ProdutoPrismaRepository } from "@modules/catalogo/infra/database/produto.prisma.repository";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
    
    prisma.$connect().then(
        async () => {
            console.log('Postgress Connected');
        }
    );
   
    const categoriaRepo = new CategoriaPrismaRepository(prisma)
    const produtoRepo = new ProdutoPrismaRepository(prisma)

    /// Categoria ///

    //const categoriaRecuId: Categoria | null = await categoriaRepo.recoverByUuid("")

    //const categoria: Categoria = Categoria.create({ nome: 'banho'})

    // const categoriaRecu = Categoria.recover({
    //     id: "d48bb575-100d-40f4-b906-38a9d9cbb3c8",
    //     nome: "banho"
    // })

    //const categoriaInse = await categoriaRepo.insert(categoria)
    
    //const categoriaExi: boolean = await categoriaRepo.exists("")

    //const categoriaUp: boolean = await categoriaRepo.update(.id,)
    
    //const categoriaDel: boolean = await categoriaRepo.delete("")
    
    //const categoriaAll: Array<Categoria> = await categoriaRepo.recoverAll()
    
    /// Produto ///

    //const produtoRecuId: Produto | null = await produtoRepo.recoverByUuid("")

    //const produto: Produto = Produto.create({nome: 'toalha', descricao: 'toalha de banho', valor: 50, categorias: []})

    // const produtoRecu = Produto.recover({
    //     id: "9fbd3b52-5200-45d8-a5df-d86a92c970f2",
    //     nome: "toalha",
    //     descricao: "toalha de banho",
    //     valor: 100,
    //     categorias: [categoriaRecu]
    // })

    //const produtoInse = await produtoRepo.insert()

    //const prdotutoExi: boolean = await produtoRepo.exists("")

    //const produtoUp: boolean = await produtoRepo.update(produtoRecu.id, produtoRecu)

    //const produtoDel: boolean = await produtoRepo.delete("")

    //const produtoAll: Array<Produto> = await produtoRepo.recoverAll()


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