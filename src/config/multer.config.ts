import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const region = process.env.AWS_REGION || 'us-east-1';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || 'AWS_ACCESS_KEY_ID';
const secretAccessKey =
  process.env.AWS_SECRET_ACCESS_KEY || 'AWS_SECRET_ACCESS_KEY';

// Configure AWS SDK with your credentials
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

// Define local storage for uploaded files
const storage = (uploadDir: string) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure the directory exists
      fs.mkdirSync(uploadDir, { recursive: true });

      cb(null, uploadDir); // Specify the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      // Set the file name
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Define S3 storage
const s3Storage = (bucketName: string) =>
  multerS3({
    s3: s3Client,
    bucket: bucketName,
    // acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

// Initialize multer instances with dynamic storage configuration
export const uploadLocal = (uploadDir: string) =>
  multer({ storage: storage(`uploads/${uploadDir}`) });
export const uploadS3 = (bucketName: string) =>
  multer({ storage: s3Storage(bucketName) });

// Specific upload handlers
export const uploadInbodyLocal = uploadLocal('inbodies/');
export const uploadTraineeLocal = uploadLocal('trainees/');
export const uploadInbodyS3 = uploadS3(
  process.env.S3_BUCKET_NAME_INBODIES || ''
);
export const uploadTraineeS3 = uploadS3(
  process.env.S3_BUCKET_NAME_TRAINEES || ''
);
