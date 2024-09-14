// src/services/attendance.service.ts

import { Attendance } from '@prisma/client';
import prisma from '../infrastructure/database/prisma';
import { TraineeWithoutPassword } from '../helpers/ExcludePassword';
import traineeService from './trainee.service';
import { NotFoundError } from '../errors/NotFoundError';
import { BadRequestError } from '../errors/BadRequestError';
import { plainToInstance } from 'class-transformer';
import { UpdateTraineeDTO } from '../dtos/trainee.dto';
import { ConflictError } from '../errors/ConflictError';

class AttendanceService {
  async createAttendance(parcode: string) {
    const trainee = await traineeService.getTraineeByParcode(parcode);

    if (!trainee) throw new NotFoundError('Could not find trainee');

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const subscriptionEndDate = new Date(trainee.subscriptionEndDate);

    const duplicateAttendance = await prisma.attendance.findFirst({
      where: {
        traineeId: trainee.id,
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    if (duplicateAttendance)
      throw new ConflictError('This trainee has already attended');

    if (trainee.remainingClasses === 0 || today > subscriptionEndDate)
      throw new BadRequestError({
        remainingClasses: ['You have finished your subscription classes'],
      });

    await prisma.trainee.update({
      where: { id: trainee.id },
      data: {
        subscriptionStatus:
          trainee.remainingClasses - 1 === 0 ? 'INACTIVE' : 'ACTIVE',
        remainingClasses: trainee.remainingClasses - 1,
      },
    });

    return prisma.attendance.create({
      data: { traineeId: trainee.id },
      include: {
        trainee: {
          select: TraineeWithoutPassword,
        },
      },
    });
  }

  async getAllAttendances(): Promise<any> {
    const attendances = await prisma.attendance.findMany({
      include: {
        trainee: {
          select: TraineeWithoutPassword,
        },
      },
    });

    // Group attendances by day
    const groupedAttendances = this.groupAttendancesByDay(attendances);

    return groupedAttendances;
  }

  private groupAttendancesByDay(attendances: Attendance[]): any {
    const grouped = attendances.reduce((acc, attendance) => {
      const date = new Date(attendance.date);
      const day = date.toISOString().split('T')[0]; // Get YYYY-MM-DD format

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(attendance);
      return acc;
    }, {} as { [key: string]: Attendance[] });

    return grouped;
  }

  async getAttendanceByTraineeId(traineeId: number): Promise<Attendance[]> {
    return prisma.attendance.findMany({
      where: {
        traineeId,
      },
    });
  }

  async deleteAttendanceById(id: number) {
    return await prisma.attendance.delete({ where: { id } });
  }
}

export default new AttendanceService();
