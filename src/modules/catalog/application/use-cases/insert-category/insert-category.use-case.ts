import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { CreateCategoryProps, ICategory } from "@modules/catalog/domain/category/category.types";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class InsertCategoryUseCase implements IUseCase<CreateCategoryProps, ICategory> {

    private _categoryRepository: ICategoryRepository<Category>;

    constructor(repository: ICategoryRepository<Category>) {
        this._categoryRepository = repository;
    };

    async execute(categoryProps: CreateCategoryProps): Promise<ICategory> {
       
        const category: Category = Category.create(categoryProps);

        const categoryInserted = await this._categoryRepository.insert(category);

        return CategoryMap.toDTO(categoryInserted);
    };
};