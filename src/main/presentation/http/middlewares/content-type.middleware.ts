import { NextFunction, Request, Response } from "express";

const allowedContentTypes = ['application/json'];

export function contentTypeMiddleware(request: Request, response: Response, next: NextFunction) {
    const contentType = request.headers['content-type'];

    if (!contentType || !allowedContentTypes.includes(contentType)) {
        return response.status(415).send('Unsupported Media Type');
    }

    next();
}