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

    const categoriaRepo = new CategoriaPrismaRepository(prisma);

    const categoria: Categoria = Categoria.create({ nome: 'banho'})
    
    const categoriaInse = await categoriaRepo.insert(categoria)

    const categoriaRecu = await categoriaRepo.recoverByUuid("899bc441-36c0-4f13-9580-ef72277d9137");
    
    const categoriaExi = await categoriaRepo.exists("899bc441-36c0-4f13-9580-ef72277d9137");

    console.log(categoriaExi)
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