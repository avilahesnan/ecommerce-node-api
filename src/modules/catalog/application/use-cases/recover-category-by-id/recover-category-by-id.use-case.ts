import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

export class RecoverCategoryByIdUseCase implements IUseCase<string, ICategory> {

    private _categoryRepository: ICategoryRepository<Category>;

    constructor(repository: ICategoryRepository<Category>){
        this._categoryRepository = repository;
    };
    
    async execute(uuid: string): Promise<ICategory> {
        
        const existsCategory: boolean = await this._categoryRepository.exists(uuid);

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound();
        };

        const category = await this._categoryRepository.recoverByUuid(uuid);

        return CategoryMap.toDTO(category as Category);
    };
};