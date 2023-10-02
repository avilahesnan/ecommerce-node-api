import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { CategoriaPrismaRepository } from "@modules/catalogo/infra/database/categoria.prisma.repository";
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

    // const categoriaRepo = new CategoriaPrismaRepository(prisma);

    // const categoria: Categoria = Categoria.create({ nome: 'banho'})

    // const categoria = Categoria.recover({
    //     id: "",
    //     nome: ""
    // })
    
    // const categoriaInse = await categoriaRepo.insert(categoria)

    // const categoriaRecu: Categoria | null = await categoriaRepo.recoverByUuid("");
    
    // const categoriaExi: boolean = await categoriaRepo.exists("");

    // const categoriaDel: boolean = await categoriaRepo.delete("");
    
    // const categoriaUp: boolean = await categoriaRepo.update(categoria.id, categoria)

    // const categoriaAll: Array<Categoria> = await categoriaRepo.recoverAll();


    // console.log(categoriaAll)
    // console.log(categoriaExi)
    // console.log(categoriaRecu)
    // console.log(categoriaInse)
    // console.log(categoriaDel)
    // console.log(categoriaUp)

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