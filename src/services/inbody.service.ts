// src/services/inbody.service.ts

import prisma from '../infrastructure/database/prisma';
import { CreateInBodyDTO } from '../dtos/inbody.dto';
import traineeService from './trainee.service';
import { NotFoundError } from '../errors/NotFoundError';

class InBodyService {
  async createInBody(dto: CreateInBodyDTO): Promise<any> {
    const found = await traineeService.getTraineeById(dto.traineeId);
    if (!found) throw new NotFoundError('Trainee not found');

    const data = {
      ...dto,
      dietFile: `inbodies/${dto.dietFile?.filename}`,
    };

    console.log('🚀 ~ InBodyService ~ createInBody ~ data:', data);

    return prisma.inBody.create({
      data,
    });
  }

  async getAll(): Promise<any> {
    return prisma.inBody.findMany({
      orderBy: {
        date: 'desc', // Sort by date in descending order
      },
    });
  }

  // Add more methods as needed
}

export default new InBodyService();
