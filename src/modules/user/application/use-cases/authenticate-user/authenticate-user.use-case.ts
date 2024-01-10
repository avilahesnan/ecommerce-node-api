import { User } from "@modules/user/domain/user.entity";
import { IUserRepository } from "@modules/user/domain/user.repository.interface";
import { CredentialsUserProps, IUser } from "@modules/user/domain/user.types";
import { UserMap } from "@modules/user/infra/mappers/user.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class AuthenticateUserUseCase implements IUseCase<CredentialsUserProps,IUser> {
    private _userRepository: IUserRepository<User>;

    constructor(repository: IUserRepository<User>){
        this._userRepository = repository;
    }

    async execute(credenciais: CredentialsUserProps): Promise<IUser> {
       
        const user: User | null = await this._userRepository.recoverByEmail(credenciais.email);
        if (!user){
            throw new Error('Non-existent user');  //futuramente uma execção de aplicação específica
        }
        const authenticated: boolean = await this._userRepository.authenticate(credenciais);
        if (!authenticated) {
            throw new Error('Authentication failed');  //futuramente uma execção de aplicação específica
        }
        return UserMap.toDTO(user);
    }
}
