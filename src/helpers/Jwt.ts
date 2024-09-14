import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret = process.env.JWT_SECRET || 'hard-coded-secret';

export const generateToken = (payload: object, expiresIn: string = '30d') => {
  // console.log(secret);
  return jwt.sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    // console.log(secret);
    return jwt.verify(token, secret);
  } catch (error) {
    console.error('Token verification failed:', error);
    throw new Error('Invalid token');
  }
};
