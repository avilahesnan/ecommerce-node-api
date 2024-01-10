import { authenticateUserUseCase, registerUserUseCase } from "@modules/user/application/use-cases";
import { AuthenticateUserExpressController } from "./authenticate-user/authenticate-user.express.controller";
import { RegisterUserExpressController } from "./register-user/resgiter-user.express.controller";

export const registerUserController = new RegisterUserExpressController(registerUserUseCase);
export const authenticateUserController = new AuthenticateUserExpressController(authenticateUserUseCase);
