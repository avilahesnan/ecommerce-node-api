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

    const categoria: Categoria = Categoria.create({ nome: 'banho'})

    // const categoriaRe = Categoria.recover({
    //     id: "",
    //     nome: ""
    // })

    const categoriaInse = await categoriaRepo.insert(categoria)
    
    // const categoriaRecu: Categoria | null = await categoriaRepo.recoverByUuid("")
    
    // const categoriaExi: boolean = await categoriaRepo.exists("")
    
    // const categoriaDel: boolean = await categoriaRepo.delete("")
    
    // const categoriaUp: boolean = await categoriaRepo.update(categoria.id, categoria)
    
    //const categoriaAll: Array<Categoria> = await categoriaRepo.recoverAll()
    
    /// Produto ///

    const produto: Produto = Produto.create({nome: 'toalha', descricao: 'toalha de banho', valor: 50, categorias: [categoria]})

    // const produtoRe = Produto.recover({
    //     id: "",
    //     nome: "",
    //     descricao: "",
    //     valor: 50,
    //     categorias: []
    // })

    const produtoInse = await produtoRepo.insert(produto)

    //const produtoRecu: Produto | null = await produtoRepo.recoverByUuid("")

    //const prdotutoExi: boolean = await produtoRepo.exists("")

    //const produtoDel: boolean = await produtoRepo.delete("")

    //const produtoUp: boolean = await produtoRepo.update(produto.id, produto)

    //const produtoAll: Array<Produto> = await produtoRepo.recoverAll()

    // console.log(categoriaAll)
    // console.log(categoriaExi)
    // console.log(categoriaRecu)
    // console.log(categoriaInse)
    // console.log(categoriaDel)
    // console.log(categoriaUp)
    // console.log(produtoAll)
    //console.log(prdotutoExi)
    // console.log(produtoRecu)
    // console.log(produtoInse)
    // console.log(produtoDel)

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