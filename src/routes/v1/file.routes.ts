// src/routes/inbody.routes.ts

import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import fileController from '../../controllers/file.controller';
import validationMiddleware from '../../middlewares/validationMiddleware';
import { GetFileDTO } from '../../dtos/file.dto';

const router = Router();

// /**
//  * @swagger
//  * tags:
//  *   name: Files
//  *   description: File management
//  */

// /**
//  * @swagger
//  * /files/:
//  *   get:
//  *     summary: Retrieve a file
//  *     tags: [Files]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: query
//  *         name: filename
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The file name
//  *       - in: query
//  *         name: bucket
//  *         schema:
//  *           type: string
//  *         required: true
//  *         description: The S3 bucket name
//  *     responses:
//  *       200:
//  *         description: The file content
//  *         content:
//  *           application/octet-stream:
//  *             schema:
//  *               type: string
//  *               format: binary
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: File not found
//  */

// router.get(
//   '/files',
//   // authMiddleware,
//   validationMiddleware(GetFileDTO),
//   fileController.getFile
// );

// Add more routes as needed

export default router;
