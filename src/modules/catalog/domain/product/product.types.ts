import { IDatasController, keyDataController } from "@shared/domain/datas.types";
import { ICategory } from "../category/category.types";

export enum StatusProduct {
    ACTIVE = "ACTIVE",
    OFF = "OFF"
};

export interface IProduct extends IDatasController {
    id?: string;
    name: string;
    description: string;
    value: number;
    categories: Array<ICategory>;
    status?: StatusProduct;
};

export type CreateProductProps = Omit<IProduct, "id" | keyDataController | "status">;

export type RecoverProductProps = IProduct & {
    id: NonNullable<IProduct["id"]>;
};