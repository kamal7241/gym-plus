import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import LoginDTO from '../../dtos/auth.dto';
import validationMiddleware from '../../middlewares/validationMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 token:
 *                   type: string
 */
router.post('/login', validationMiddleware(LoginDTO), authController.login);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get current user
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             example:
 *               id: "12345"
 *               phoneNumber: "1234567890"
 *               name: "John Doe"
 *               email: "johndoe@example.com"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: "Unauthorized"
 */
router.get('/me', authMiddleware, authController.me);

export default router;
