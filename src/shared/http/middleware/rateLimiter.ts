import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';

export default async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            password: process.env.REDIS_PASS || undefined,
        });

        const limiter = new RateLimiterRedis({
            storeClient: redisClient,
            keyPrefix: 'ratelimit',
            points: 5,
            duration: 1,
        });

        await limiter.consume(req.ip!);

        return next();
    } catch (error) {
        throw new AppError('Rate limit exceeded.', 429);
    }
};
