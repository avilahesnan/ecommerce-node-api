import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient();

async function main() {
    let categoria: Categoria;
    categoria = Categoria.create({nome: 'mesa'});

    await prisma.categoria.create({
        data: {
            id: categoria.id,
            nome: categoria.nome
        }
    })

    // const categoriaRecuperada = await prisma.categoria.update({
    //     where: {id: ''},
    //     data: { nome: 'banho'},
    // })

    const listarCategorias = await prisma.categoria.findMany();
    console.log(listarCategorias);
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