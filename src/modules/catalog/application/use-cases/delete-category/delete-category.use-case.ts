import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

export class DeleteCategoryUseCase implements IUseCase<string, boolean> {
    private _categoryRepository: ICategoryRepository<Category>

    constructor(repository: ICategoryRepository<Category>) {
        this._categoryRepository = repository;
    };
    
    async execute(uuid: string): Promise<boolean> {

        const existsCategory: boolean = await this._categoryRepository.exists(uuid);

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound();
        };

        const deletedCategory: boolean = await this._categoryRepository.delete(uuid);

        return deletedCategory;
    };
};