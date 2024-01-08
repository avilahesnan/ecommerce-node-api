import { IDatasController, keyDataController } from "@shared/domain/datas.types";

export enum TypeUser {
    CLIENT = 'CLIENT',
    ADM = 'ADM'
}

export interface IUser extends IDatasController {
    id?: string;
    name: string;
    email: string;
    password: string;
    type: TypeUser;
}

export type CreateUserProps = Omit<IUser, 'id' | keyDataController>;

export type RecoverUserProps = IUser & {
    id: NonNullable<IUser['id']>
};
