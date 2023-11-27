import { IRepository } from "@shared/domain/repository.interface";
import { Product } from "./product.entity";
import { StatusProduct } from "./product.types";
import { Category } from "../category/category.entity";

export interface IProductRepository<T> extends IRepository<T> {
    addCategory(product: Product, category: Category): Promise<boolean>;
    removeCategory(product: Product, category: Category): Promise<boolean>;
    alterStatus(product: Product, status: StatusProduct): Promise<boolean>;
    recoverByCategory(idCategory: string): Promise<Array<Product>>;
};