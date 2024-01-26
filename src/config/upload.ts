import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

interface IUploadConfig {
    driver: 's3' | 'disk';
    tempFolder: string;
    directory: string;
    multer: {
        storage: multer.StorageEngine;
    };
    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploader');

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
    directory: uploadFolder,
    tempFolder,
    multer: {
        storage: multer.diskStorage({
            destination: uploadFolder,
            filename: (req, file, cb) => {
                const fileHash = crypto.randomBytes(10).toString('hex');
                cb(null, `${fileHash}-${file.originalname}`);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'Sales-api-test',
        },
    },
} as IUploadConfig;
