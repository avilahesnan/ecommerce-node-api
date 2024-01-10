import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const authUserMiddleware = (typesUserAllowed: Array<String>) => {
    return (request: Request, response: Response, next: NextFunction) => {
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            next(new HttpErrors.UnauthorizedError({ message: 'Token was not sent on request'}));
        }

        const secretKey = process.env.JWT_SECRET_KEY as string;
        let user;
        try {
            user = jwt.verify(token as string, secretKey) as { id:string, name: string, email: string, type: string};
            if (!typesUserAllowed.includes(user.type)) {
                next(new HttpErrors.ForbiddenError());
            }
        } catch (error) {
            next(new HttpErrors.ForbiddenError());
        }

        next();
    }
}
export { authUserMiddleware as authUser  }
