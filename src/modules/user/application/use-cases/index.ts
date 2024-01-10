import { userRepository } from "@modules/user/infra/database";
import { RegisterUserUseCase } from "./register-user/register-user.use-case";
import { AuthenticateUserUseCase } from "./authenticate-user/authenticate-user.use-case";

export const registerUserUseCase = new RegisterUserUseCase(userRepository);
export const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
