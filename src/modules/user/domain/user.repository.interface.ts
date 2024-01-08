import { IRepository } from "@shared/domain/repository.interface";
import { User } from "./user.entity";

export interface IUserRepository<T> extends IRepository<T> {
    authenticate(user:User): Promise<boolean>;
    recoverByEmail(email:string):  Promise<User | null>;
}
