import { User } from "@modules/user/domain/user.entity";
import { IUserRepository } from "@modules/user/domain/user.repository.interface";
import { PrismaRepository } from "@shared/infra/database/prisma.repository";
import { UserMap } from "../mappers/user.map";
import { CredentialsUserProps } from "@modules/user/domain/user.types";
import bcrypt from 'bcrypt';

export class UserPrismaRepository extends PrismaRepository implements IUserRepository<User> {
   
    async authenticate(credentials:CredentialsUserProps): Promise<boolean> {
        const userExtant = await this.recoverByEmail(credentials.email);
        if(!userExtant)  {
            return false;
        }
        const passwordValid: boolean = await bcrypt.compare(credentials.password, userExtant.password);
        if(!passwordValid) {
            return false;
        }
        return true;
    }

    async recoverByEmail(email: string): Promise<User | null> {
        const userRecovered = await this._datasource.user.findUnique(
            {
                where: {
                    email: email
                }
            }
        )
        if (userRecovered) {
            return UserMap.fromPrismaModelToDomain(userRecovered);
        }
        return null;
    }
   
    async recoverByUuid(uuid: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }

    async recoverAll(): Promise<Array<User>> {
        throw new Error("Method not implemented.");
    }

    async exists(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async insert(user: User): Promise<User> {
        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS as string, 10);
        const passwordCrypt = await bcrypt.hash(user.password, saltRounds);
        const userInserted = await this._datasource.user.create(
            {
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password:passwordCrypt,
                    type: UserMap.toTypeUserPrisma(user.type)
                }
            }
        );
        return UserMap.fromPrismaModelToDomain(userInserted);
    }

    async update(uuid: string, user: User): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    async delete(uuid: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}
