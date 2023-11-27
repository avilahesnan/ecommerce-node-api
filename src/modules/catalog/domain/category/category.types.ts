import { IDatasController, keyDataController } from "@shared/domain/datas.types";

export interface ICategory extends IDatasController {
    id?: string;
    name: string;
};

export type CreateCategoryProps = Omit<ICategory, "id" | keyDataController>;

export type RecoverCategoryProps = ICategory & {
    id: NonNullable<ICategory["id"]>;
};