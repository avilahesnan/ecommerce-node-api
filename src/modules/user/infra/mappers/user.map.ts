import { Prisma, TypeUserPrisma } from "@prisma/client";
import { User } from "@modules/user/domain/user.entity";
import { IUser, RecoverUserProps, TypeUser } from "@modules/user/domain/user.types";

export class UserMap {
    public static toDTO(user: User): IUser {
        return {
            id: user.id,
            name: user.name,
            email:  user.email,
            password: user.password,
            type: user.type,
            dateCreated: user.dateCreated,
            dateUpdated: user.dateUpdated
        }
    }

    public static toDomain(user: RecoverUserProps): User {
        return User.recover(user);
    }

    public static fromPrismaModelToDomain(UserPrisma: Prisma.UserCreateInput): User{
        return UserMap.toDomain({
            id: UserPrisma.id,
            name: UserPrisma.name,
            email: UserPrisma.email,
            password: UserPrisma.password,
            type: TypeUser[UserPrisma.type],
            dateCreated: UserPrisma.dateCreated as Date,
            dateUpdated: UserPrisma.dateUpdated as Date
        });
    }

    public static toTypeUserPrisma(type: TypeUser): TypeUserPrisma {
        return TypeUserPrisma[type.toString() as keyof typeof TypeUserPrisma];
    }
}
