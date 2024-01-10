import { AuthenticateUserUseCase } from "@modules/user/application/use-cases/authenticate-user/authenticate-user.use-case";
import { CredentialsUserProps, IUser } from "@modules/user/domain/user.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

export class AuthenticateUserExpressController extends ExpressController {

    private _authenticateUserUseCase: AuthenticateUserUseCase;

    constructor(authenticateUserUseCase: AuthenticateUserUseCase) {
        super();
        this._authenticateUserUseCase = authenticateUserUseCase;
    }

    async authenticate(request: Request, response: Response, next: NextFunction) {
        try {
            const credenciaisInputDTO: CredentialsUserProps = request.body as CredentialsUserProps;
           
            const userAuthenticated: IUser = await this._authenticateUserUseCase.execute(credenciaisInputDTO);

            //Cria um objeto com dados simplificados de usuário
            const { id, name, email, type } = userAuthenticated;
            const userSimplifiedDTO = { id, name, email, type };

            //Gera o Token JWT com os dados simplificados do usuário
            const secretKey = process.env.JWT_SECRET_KEY as string;
            const token = jwt.sign(userSimplifiedDTO, secretKey, { expiresIn: '1h' });
   
            this.sendSuccessResponse(response,token);
        } catch (error) {
            next(error);
        }
    }
}
