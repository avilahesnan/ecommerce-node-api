import { IRepository } from "@shared/domain/repository.interface";
import { User } from "./user.entity";
import { CredentialsUserProps } from "./user.types";

export interface IUserRepository<T> extends IRepository<T> {
    authenticate(credentials:CredentialsUserProps): Promise<boolean>;
    recoverByEmail(email:string):  Promise<User | null>;
}
