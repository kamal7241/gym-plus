import LoginDTO from '../dtos/auth.dto';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { Bcrypt } from '../helpers/Bcrypt';
import { User } from '../types/user.types';
import userService from './user.service';

class AuthService {
  async Login(login: LoginDTO) {
    const user = await userService.findUserByPhoneNumber(login.phoneNumber);
    if (!user) throw new UnauthorizedError('Bad credentials');

    const isPasswordValid = await Bcrypt.compare(login.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Bad credentials');
    }

    return user;
  }
}

export default new AuthService();
