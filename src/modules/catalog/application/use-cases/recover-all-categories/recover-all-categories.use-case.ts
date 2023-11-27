import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { ICategory } from "@modules/catalog/domain/category/category.types";
import { CategoryMap } from "@modules/catalog/infra/mappers/category.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class RecoverAllCategoriesUseCase implements IUseCase<void, Array<ICategory>> {
    
    private _categoryRepository: ICategoryRepository<Category>;

    constructor(repository: ICategoryRepository<Category>){
        this._categoryRepository = repository;
    };

    async execute(): Promise<ICategory[]> {  
          
        const allCategories: Array<Category> = await this._categoryRepository.recoverAll();
        
        const allCategoriesDTO = allCategories.map((category) => CategoryMap.toDTO(category));

        return allCategoriesDTO;
    };
};