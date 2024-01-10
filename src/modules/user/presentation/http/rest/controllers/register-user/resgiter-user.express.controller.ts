import { RegisterUserUseCase } from "@modules/user/application/use-cases/register-user/register-user.use-case";
import { CreateUserProps, IUser } from "@modules/user/domain/user.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

export class RegisterUserExpressController extends ExpressController {

    private _registerUserUseCase: RegisterUserUseCase;

    constructor(registerUserUseCase: RegisterUserUseCase) {
        super();
        this._registerUserUseCase = registerUserUseCase;
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const userInputDTO: CreateUserProps = request.body as CreateUserProps;
            const userRegistered: IUser = await this._registerUserUseCase.execute(userInputDTO);
            this.sendSuccessResponse(response,userRegistered);
        } catch (error) {
            next(error);
        }
    }
}
