import { User } from "@modules/user/domain/user.entity";
import { IUserRepository } from "@modules/user/domain/user.repository.interface";
import { CreateUserProps, IUser } from "@modules/user/domain/user.types";
import { UserMap } from "@modules/user/infra/mappers/user.map";
import { IUseCase } from "@shared/application/use-case.interface";

export class RegisterUserUseCase implements IUseCase<CreateUserProps,IUser> {
    private _userRepository: IUserRepository<User>;

    constructor(repository: IUserRepository<User>){
        this._userRepository = repository;
    }

    async execute(userProps: CreateUserProps): Promise<IUser> {
       
        const user: User = User.create(userProps);
        const userInserted = await this._userRepository.insert(user);
        return UserMap.toDTO(userInserted);
    }
}
