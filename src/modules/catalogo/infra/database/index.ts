import { prisma } from "@main/infra/database/orm/prisma/client"
import { Category } from "@modules/catalogo/domain/category/category.entity"
import { ICategoryRepository } from "@modules/catalogo/domain/category/category.repository.interface"
import { Product } from "@modules/catalogo/domain/product/product.entity"
import { IProductRepository } from "@modules/catalogo/domain/product/product.repository.interface"
import { ProductPrismaRepository } from "./product.prisma.repository"
import { CategoryPrismaRepository } from "./category.prisma.repository"

export const categoryRepository: ICategoryRepository<Category> = new CategoryPrismaRepository(prisma)
export const productRepository: IProductRepository<Product> = new ProductPrismaRepository(prisma)