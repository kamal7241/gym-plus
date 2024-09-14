import { AdminWithoutPassword } from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class CoachService {
  async createCoach(data: Prisma.CoachCreateInput) {
    return await prisma.coach.create({ data });
  }

  async checkIfDuplicate(phoneNumber: string) {
    return await prisma.coach.findUnique({
      where: {
        phoneNumber,
      },
    });
  }

  async getCoaches() {
    return await prisma.coach.findMany({
      select: AdminWithoutPassword,
    });
  }

  async getCoachById(id: number) {
    return await prisma.coach.findUnique({
      where: { id },
      select: AdminWithoutPassword,
    });
  }

  async updateCoach(id: number, data: Prisma.CoachUpdateInput) {
    return await prisma.coach.update({
      where: { id },
      data,
      select: AdminWithoutPassword,
    });
  }

  async deleteCoach(id: number) {
    return await prisma.coach.delete({ where: { id } });
  }

}

export default new CoachService();
