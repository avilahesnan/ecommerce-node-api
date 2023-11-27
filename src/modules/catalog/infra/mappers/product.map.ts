import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProduct, RecoverProductProps, StatusProduct } from "@modules/catalog/domain/product/product.types";
import { CategoryMap } from "./category.map";
import { ProductWithCategoryPrisma } from "@shared/infra/database/prisma.types";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { StatusProductPrisma } from "@prisma/client";

export class ProductMap {

    public static toDTO(product: Product): IProduct {
        return {
            id: product.id,
            name: product.name,
            description: product.description,
            value: product.value,
            categories: product.categories.map((category) => CategoryMap.toDomain(category)),
            dateCreated: product.dateCreated,
            dateUpdated: product.dateUpdated,
            dateDeletion: product.dateDeletion,
            status: product.status
        };
    };

    public static toDomain(product: RecoverProductProps): Product {
        return Product.recover(product);
    };

    public static fromPrismaModeltoDomain(product: ProductWithCategoryPrisma): Product {
        
        const categories:  Array<Category> = [];

        product.categories.map((category) => {
            categories.push(CategoryMap.fromPrismaModeltoDomain(category.category));
        });
        
        return this.toDomain({
            id: product.id,
            name: product.name,
            description: product.description,
            value: product.value,
            categories: categories,
            dateCreated: product.dateCreated,
            dateUpdated: product.dateUpdated,
            dateDeletion: product.dateDeletion,
            status: StatusProduct[product.status]
        });
    }

    public static toStatusProductPrisma(status: StatusProduct): StatusProductPrisma {
        return StatusProductPrisma[status.toString() as keyof typeof StatusProductPrisma];
    };
};