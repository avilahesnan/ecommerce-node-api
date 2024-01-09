import { IRepository } from "@shared/domain/repository.interface";
import { User } from "./user.entity";
import { CredenciaisUserProps } from "./user.types";

export interface IUserRepository<T> extends IRepository<T> {
    authenticate(credenciais:CredenciaisUserProps): Promise<boolean>;
    recoverByEmail(email:string):  Promise<User | null>;
}
