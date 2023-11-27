import { Category } from "@modules/catalog/domain/category/category.entity";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { CategoryMap } from "../mappers/category.map";
import { IRepository } from "@shared/domain/repository.interface";

export class CategoryPrismaRepository extends PrismaRepository implements IRepository<Category> {

    async recoverByUuid(uuid: string): Promise<Category | null> {
        
        const categoryRecovered = await this._datasource.category.findUnique({
                where: {
                    id: uuid
                }
            });

        if (categoryRecovered) {
            return CategoryMap.fromPrismaModeltoDomain(categoryRecovered);
        };

        return null;
    };

    async recoverAll(): Promise<Array<Category>> {
        
        const categoriesRecovereds = await this._datasource.category.findMany();
        
        const categories = categoriesRecovereds.map(
            (category) => CategoryMap.fromPrismaModeltoDomain(category)
        );

        return categories;
    };

    async exists(uuid: string): Promise<boolean> {
        
        const categoryExtant = await this.recoverByUuid(uuid);
        
        if (categoryExtant) {
            return true;
        };

        return false;
    };

    async insert(category: Category): Promise<Category> {
        
        const categoryInserted = await this._datasource.category.create({
                data: {
                    id: category.id,
                    name: category.name
                }
            });

        return CategoryMap.fromPrismaModeltoDomain(categoryInserted);
    };

    async update(uuid: string, category: Category): Promise<boolean> {
        
        const categoryUpdated = await this._datasource.category.update({
            where: {
                id: uuid
            },
            data: CategoryMap.toDTO(category)
        });

        if (categoryUpdated) {
            return true;
        };

        return false; 
    };

    async delete(uuid: string): Promise<boolean> {
        
        const categoryDeleted = await this._datasource.category.delete({
            where: {
                id: uuid
            }
        });

        if (categoryDeleted.id) {
            return true;
        };

        return false;
    };
};