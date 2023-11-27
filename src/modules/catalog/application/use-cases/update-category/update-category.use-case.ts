import { Category } from "@modules/catalog/domain/category/category.entity";
import { ICategoryRepository } from "@modules/catalog/domain/category/category.repository.interface";
import { RecoverCategoryProps } from "@modules/catalog/domain/category/category.types";
import { IUseCase } from "@shared/application/use-case.interface";
import { CategoryApplicationExceptions } from "../../exceptions/category.application.exception";

export class UpdateCategoryUseCase implements IUseCase<RecoverCategoryProps, boolean> {

    private _categoryRepository: ICategoryRepository<Category>;

    constructor(repository: ICategoryRepository<Category>) {
        this._categoryRepository = repository;
    };

    async execute(categoryProps: RecoverCategoryProps): Promise<boolean> {
        
        const existsCategory: boolean = await this._categoryRepository.exists(categoryProps.id);

        if (!existsCategory) {
            throw new CategoryApplicationExceptions.CategoryNotFound();
        };

        const category: Category = Category.recover(categoryProps);

        const UpdatedCategory = await this._categoryRepository.update(category.id, category);

        return UpdatedCategory;
    };
};