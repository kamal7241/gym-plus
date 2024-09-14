import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { verifyToken } from '../helpers/Jwt';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded;
    next();
  } catch (error: any) {
    throw new UnauthorizedError('Invalid token');
  }
};

export const coachMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = (req as any).user;
  if (!decodedUser || decodedUser.userType !== 'COACH') {
    throw new UnauthorizedError('Only allowed for coaches');
  }

  next();
};

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const decodedUser = (req as any).user;
  if (
    !decodedUser ||
    (decodedUser.userType !== 'COACH' && decodedUser.userType !== 'SECRETARY')
  ) {
    throw new UnauthorizedError('Only allowed for admins');
  }

  next();
};
