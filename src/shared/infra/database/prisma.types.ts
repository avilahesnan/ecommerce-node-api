import { Prisma } from "@prisma/client";

export const productIncludeCategoryPrisma = Prisma.validator<Prisma.ProductInclude>()({
    categories: {
        include: {
            category: true
        }
    }
});

export type ProductWithCategoryPrisma = Prisma.ProductGetPayload<{
    include: typeof productIncludeCategoryPrisma
}>;