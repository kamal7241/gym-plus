import LoginDTO from '../dtos/auth.dto';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import { Bcrypt } from '../helpers/Bcrypt';
import {
  AdminWithoutPassword,
  TraineeWithoutPassword,
} from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';

class UserService {

  async findUserByPhoneNumber(phoneNumber: string) {
    const coach = await prisma.coach.findUnique({ where: { phoneNumber } });
    if (coach) return { ...coach, userType: 'COACH' };

    const secretary = await prisma.secretary.findUnique({
      where: { phoneNumber },
    });
    if (secretary) return { ...secretary, userType: 'SECRETARY' };

    const trainee = await prisma.trainee.findUnique({ where: { phoneNumber } });
    if (trainee) return { ...trainee, userType: 'TRAINEE' };

    return null;
  }

  async findUserById(id: number, userType: string) {
    let user;

    if (userType === 'COACH') {
      user = await prisma.coach.findUnique({
        where: { id },
      });
    } else if (userType === 'SECRETARY') {
      user = await prisma.secretary.findUnique({
        where: { id },
      });
    } else if (userType === 'TRAINEE') {
      user = await prisma.trainee.findUnique({
        where: { id },
        include: {
          inBodies: true,
        },
      });
    }
    if (user) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  }
}

export default new UserService();
