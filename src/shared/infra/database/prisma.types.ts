import { Prisma } from "@prisma/client";

export const produtoIncludeCategoriaPrisma = Prisma.validator<Prisma.ProdutoInclude>()({
    categorias: {
        include: {
            categoria: true
        }
    }
})

export type ProdutoWithCategoriaPrisma = Prisma.ProdutoGetPayload<{
    include: typeof produtoIncludeCategoriaPrisma
}>