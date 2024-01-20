import path from 'path';
import multer from 'multer';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');

export default {
    directory: uploadFolder,
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename: (req, file, cb) => {
            const fileHash = crypto.randomBytes(10).toString('hex');
            cb(null, `${fileHash}-${file.originalname}`);
        },
    }),
};
