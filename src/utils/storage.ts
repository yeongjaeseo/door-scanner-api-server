import { Storage } from '@google-cloud/storage';
import { logger} from '../utils/logging';

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET_NAME || 'lbstech-cloud-run-test';

/**
 * Streams files directly from the request to Google Cloud Storage and returns their public URLs.
 * 
 * @param req The request object from Express.js, containing files to upload.
 * @returns A Promise that resolves to an array of URLs of the uploaded files.
 */
export const uploadFilesToGCS = async (files: Express.Multer.File[] | undefined): Promise<string[]> => {

    if (!files || files.length === 0) {
        logger.error("No files to upload.");
        throw new Error("No files to upload.");
    }

    const uploadPromises = files.map((file) => {
        const blob = storage.bucket(bucketName).file(file.originalname);

        return new Promise<string>((resolve, reject) => {
            const stream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });

            stream.on('error', (error) => {
                logger.error(`Failed to upload ${file.originalname}:`, error);
                reject(new Error(`Failed to upload ${file.originalname}.`));
            });

            stream.on('finish', async () => {
                try {
                    await blob.makePublic();
                    const url = `https://storage.googleapis.com/${bucketName}/${file.originalname}`;
                    logger.info(`Uploaded and made public ${file.originalname}: ${url}`);
                    resolve(url);
                } catch (error) {
                    logger.error(`Failed to make ${file.originalname} public:`, error);
                    reject(new Error(`Failed to make ${file.originalname} public.`));
                }
            });

            // Directly stream file from request to GCS
            stream.end(file.buffer);
        });
    });

    try {
        return await Promise.all(uploadPromises);
    } catch (error) {
        logger.error("Failed to upload one or more files.", error);
        throw new Error("Failed to upload one or more files.");
    }
};
