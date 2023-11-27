import { Product } from "@modules/catalog/domain/product/product.entity";
import { IProductRepository } from "@modules/catalog/domain/product/product.repository.interface";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { productIncludeCategoryPrisma } from "@shared/infra/database/prisma.types";
import { ProductMap } from "../mappers/product.map";
import { StatusProduct } from "@modules/catalog/domain/product/product.types";
import { Category } from "@modules/catalog/domain/category/category.entity";

export class ProductPrismaRepository extends PrismaRepository implements IProductRepository<Product> {
    
    async recoverByUuid(uuid: string): Promise<Product | null> {
        
        const productRecovered = await this._datasource.product.findUnique({
            where: {
                id: uuid
            },
            include: productIncludeCategoryPrisma
        });

        if (productRecovered) {
            return ProductMap.fromPrismaModeltoDomain(productRecovered);
        };

        return null;
    };
    
    async recoverAll(): Promise<Product[]> {
        
        const productsRecovereds = await this._datasource.product.findMany({
            where: {
                dateDeletion: null,
                status: StatusProduct.ACTIVE
            },
            include: productIncludeCategoryPrisma
        });

        const products: Array<Product> = [];

        if (productsRecovereds.length > 0) {
            productsRecovereds.map((product) => products.push(ProductMap.fromPrismaModeltoDomain(product)));
        };

        return products;
    };
    
    async exists(uuid: string): Promise<boolean> {

        const productExtant = await this.recoverByUuid(uuid);
        
        if (productExtant) {
            return true;
        };

        return false;
    };
    
    async insert(product: Product): Promise<Product> {

        const productInserted = await this._datasource.product.create({
            data: {
                id: product.id,
                name: product.name,
                description: product.description,
                value: product.value,
                categories: { 
                    create: product.categories.map((category) => {
                        return {
                            categoryId: category.id
                        };
                    }) 
                }
            }
        });

        return product;
    };
    
    async update(uuid: string, product: Product): Promise<boolean> {

        const productUpdated = await this._datasource.product.update({
            where: {
                id: uuid
            },
            data: {
                name: product.name,
                description: product.description,
                value: product.value
            }
        });

        if (productUpdated) {
            return true;
        };

        return false;
    };
    
    async delete(uuid: string): Promise<boolean> {

        const productDeleted = await this._datasource.product.update({
            where: {
                id: uuid
            },
            data: {
                dateDeletion: new Date()
            }
        });

        if(productDeleted.id) {
            return true;
        };

        return false;
    };

    async addCategory(product: Product, category: Category): Promise<boolean> {

        const categoryProductAdded = await this._datasource.productsCategories.create({
            data: {
                productId: product.id,
                categoryId: category.id
            }
        });

        if (categoryProductAdded) {
            return true;
        };

        return false;
    };

    async removeCategory(product: Product, category: Category): Promise<boolean> {
        
        const categoryProductRemoved = await this._datasource.productsCategories.delete({
            where: {
                productId_categoryId: {
                    productId: product.id,
                    categoryId: category.id
                }
            }
        });

        if (categoryProductRemoved) {
            return true;
        };

        return false;
    };

    async alterStatus(product: Product, status: StatusProduct): Promise<boolean> {
        
        const productStatusAltered = await this._datasource.product.update({
            where: {
                id: product.id
            },
            data: {
                status: ProductMap.toStatusProductPrisma(status)
            }
        });

        if (productStatusAltered.id) {
            return true;
        };

        return false;
    };

    async recoverByCategory(idCategory: string): Promise<Product[]> {
        
        const productsByCategoriesRecovereds = await this._datasource.product.findMany({
            where: {
                dateDeletion: null,
                status: StatusProduct.ACTIVE,
                AND: [{
                    categories: {
                        some: {
                            categoryId: idCategory
                        }
                    }
                }]
            },
            include: productIncludeCategoryPrisma
        });

        const products: Array<Product> = []

        if (productsByCategoriesRecovereds.length > 0) {
            productsByCategoriesRecovereds.map(
                (product) => products.push(ProductMap.fromPrismaModeltoDomain(product))
                );
        };
        
        return products;
    };
};