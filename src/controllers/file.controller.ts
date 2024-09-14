import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { Request, Response, NextFunction } from 'express';
import { Readable } from 'stream';
import mime from 'mime-types'; // Import mime-types for extension mapping

// Configure AWS SDK with your credentials
const s3Client: S3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

class FileController {
  async getFile(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Extract filename and bucket from request params
      const { filename, bucket } = req.query;

      if (!filename || !bucket) {
        res.status(400).json({ message: 'Filename and bucket are required' });
        return;
      }

      const params = {
        Bucket: bucket as string,
        Key: filename as string,
      };

      // Get the file from S3
      const command = new GetObjectCommand(params);
      const data = await s3Client.send(command);

      // Ensure the Body is a Readable stream
      if (!data.Body || !(data.Body instanceof Readable)) {
        throw new Error('Unexpected body type from S3');
      }

      // Determine MIME type and extension based on file name
      const contentType = data.ContentType || 'application/octet-stream';
      const fileExtension = mime.extension(contentType) || 'dat'; // Default to 'dat' if extension not found

      // Set the appropriate content type
      res.setHeader('Content-Type', contentType);

      // Set Content-Disposition header to specify filename with extension
      const disposition = `attachment; filename="${filename}.${fileExtension}"`;
      res.setHeader('Content-Disposition', disposition);

      // Pipe the file stream to the response
      data.Body.pipe(res);
    } catch (error) {
      // Handle errors
      next(error);
    }
  }
}

export default new FileController();
