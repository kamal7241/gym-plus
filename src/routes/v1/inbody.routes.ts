import { Router } from 'express';
import InBodyController from '../../controllers/inbody.controller';
import { CreateInBodyDTO } from '../../dtos/inbody.dto';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { uploadInbodyLocal, uploadInbodyS3 } from '../../config/multer.config';
import validationMiddleware from '../../middlewares/validationMiddleware';

/**
 * @swagger
 * tags:
 *   name: InBody
 *   description: InBody management
 */

const router = Router();
/**
 * @swagger
 * /inbodies:
 *   post:
 *     summary: Create a new inbody data
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateInBody'
 *     responses:
 *       200:
 *         description: Inbody data created successfully
 *     tags:
 *       - InBody
 */

router.post(
  '/inbodies',
  uploadInbodyLocal.single('dietFile'),
  authMiddleware,
  validationMiddleware(CreateInBodyDTO),
  InBodyController.createInBody
);

/**
 * @swagger
 * /inbodies:
 *   get:
 *     summary: Get all inbody data
 *     description: Retrieve a list of all inbody data records.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of inbody data records
 *     tags:
 *       - InBody
 */
router.get('/inbodies', authMiddleware, InBodyController.getAll);

export default router;
