import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../helpers/Jwt';
import userService from '../services/user.service';
import LoginDTO from '../dtos/auth.dto';
import authService from '../services/auth.service';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const login: LoginDTO = req.body;
      const user = await authService.Login(login);

      const token = generateToken({
        id: user.id,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
      });

      res.status(200).json({ seccess: true, token });
    } catch (error) {
      next(error);
    }
  }

  async me(req: Request, res: Response, next: NextFunction) {
    try {
      const decodedUser = (req as any).user;
      console.log('🚀 ~ AuthController ~ me ~ decodedUser:', decodedUser);

      let user = await userService.findUserById(
        +decodedUser.id,
        decodedUser.userType
      );
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
