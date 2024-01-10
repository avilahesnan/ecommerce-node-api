import { User } from "@modules/user/domain/user.entity";
import { IUserRepository } from "@modules/user/domain/user.repository.interface";
import { UserPrismaRepository } from "./user.prisma.repository";

export const userRepository: IUserRepository<User> = new UserPrismaRepository(prisma);
