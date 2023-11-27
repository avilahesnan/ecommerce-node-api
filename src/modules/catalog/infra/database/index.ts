import { prisma } from "@main/infra/database/orm/prisma/client";
import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { CategoryPrismaRepository } from "./category.prisma.repository";
import { ProductPrismaRepository } from "./product.prisma.repository";

export const categoryRepository: ICategoryRepository<Category> = new CategoryPrismaRepository(prisma);
export const productRepository: IProductRepository<Product> = new ProductPrismaRepository(prisma);