import { Router } from 'express';
import TraineeController from '../../controllers/trainee.controller';
import {
  adminMiddleware,
  authMiddleware,
} from '../../middlewares/authMiddleware';
import { uploadTraineeLocal, uploadTraineeS3 } from '../../config/multer.config';
import { CreateTraineeDTO, UpdateTraineeDTO, UpdateTraineeNotesDTO } from '../../dtos/trainee.dto';
import validationMiddleware from '../../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Trainees
 *   description: Trainee management
 */

/**
 * @swagger
 * /trainees:
 *   get:
 *     summary: Get all trainees
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of trainees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trainee'
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/trainees',
  authMiddleware,
  adminMiddleware,
  TraineeController.getTrainees
);

/**
 * @swagger
 * /trainees:
 *   post:
 *     summary: Create a new trainee
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrainee'
 *     responses:
 *       200:
 *         description: Trainee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/trainees',
  authMiddleware,
  adminMiddleware,
  uploadTraineeLocal.fields([
    { name: 'idFace', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
  ]),
  validationMiddleware(CreateTraineeDTO),
  TraineeController.createTrainee
);

/**
 * @swagger
 * /trainees/{id}:
 *   put:
 *     summary: Update a trainee
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trainee ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTrainee'
 *     responses:
 *       200:
 *         description: Trainee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Trainee not found
 */
router.put(
  '/trainees/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateTraineeDTO),
  TraineeController.updateTrainee
);

router.put(
  '/trainees/notes/:id',
  authMiddleware,
  adminMiddleware,
  validationMiddleware(UpdateTraineeNotesDTO),
  TraineeController.updateTrainee
);

/**
 * @swagger
 * /trainees/{id}:
 *   get:
 *     summary: Get a trainee by ID
 *     tags: [Trainees]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Trainee ID
 *     responses:
 *       200:
 *         description: Trainee found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainee'
 *       404:
 *         description: Trainee not found
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/trainees/:id',
  authMiddleware,
  adminMiddleware,
  TraineeController.getTraineeById
);

export default router;
