import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }
    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.secret);

        const { sub } = decodedToken as ITokenPayload;

        req.userId = sub;

        return next();
    } catch (error) {
        throw new AppError('Invalid token.', 401);
    }
};
