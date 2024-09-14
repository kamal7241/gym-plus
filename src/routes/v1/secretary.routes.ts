import { Router } from 'express';
import SecretaryController from '../../controllers/secretary.controller';
import {
  CreateSecretaryDTO,
  UpdateSecretaryDTO,
} from '../../dtos/secretary.dto';
import Joi from 'joi';
import {
  authMiddleware,
  coachMiddleware,
} from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Secretaries
 *   description: Secretary management
 */

/**
 * @swagger
 * /secretaries:
 *   get:
 *     summary: Get all secretaries
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of secretaries
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/secretaries',
  authMiddleware,
  coachMiddleware,
  SecretaryController.getSecretaries
);

/**
 * @swagger
 * /secretaries:
 *   post:
 *     summary: Create a new secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSecretary'
 *     responses:
 *       200:
 *         description: Secretary created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
router.post(
  '/secretaries',
  authMiddleware,
  coachMiddleware,
  validationMiddleware(CreateSecretaryDTO),
  SecretaryController.createSecretary
);

/**
 * @swagger
 * /secretaries/{id}:
 *   get:
 *     summary: Get a secretary by ID
 *     tags: [Secretaries]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     responses:
 *       200:
 *         description: Secretary found
 *       404:
 *         description: Secretary not found
 */
router.get('/secretaries/:id', SecretaryController.getSecretaryById);

/**
 * @swagger
 * /secretaries/{id}:
 *   put:
 *     summary: Update a secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSecretary'
 *     responses:
 *       200:
 *         description: Secretary updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Secretary not found
 */
router.put(
  '/secretaries/:id',
  authMiddleware,
  coachMiddleware,
  validationMiddleware(UpdateSecretaryDTO),
  SecretaryController.updateSecretary
);

/**
 * @swagger
 * /secretaries/{id}:
 *   delete:
 *     summary: Delete a secretary
 *     tags: [Secretaries]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Secretary ID
 *     responses:
 *       200:
 *         description: Secretary deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Secretary not found
 */
router.delete(
  '/secretaries/:id',
  authMiddleware,
  coachMiddleware,
  SecretaryController.deleteSecretary
);

export default router;
