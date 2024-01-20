import dotenv from 'dotenv';
dotenv.config();

const JWT_HASH = process.env.JWT_HASH!;

export default {
    secret: JWT_HASH,
    expiresIn: '1d',
};
