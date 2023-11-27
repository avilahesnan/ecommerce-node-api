import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategory, RecoverCategoryProps } from "@modules/catalog/domain/category/category.types";
import { Prisma } from "@prisma/client";

export class CategoryMap {

    public static toDTO(category: Category): ICategory {
        return {
            id: category.id,
            name: category.name,
            dateCreated: category.dateCreated,
            dateUpdated: category.dateUpdated
        };
    };

    public static toDomain(category: RecoverCategoryProps): Category {
        return Category.recover(category);
    };

    public static fromPrismaModeltoDomain(categoryPrisma: Prisma.CategoryCreateInput): Category {
        return CategoryMap.toDomain ({
            id: categoryPrisma.id,
            name: categoryPrisma.name,
            dateCreated: categoryPrisma.dateCreated as Date,
            dateUpdated: categoryPrisma.dateUpdated as Date
        });
    };
};