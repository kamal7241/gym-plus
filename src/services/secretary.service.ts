// src/services/secretary.service.ts
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { AdminWithoutPassword } from '../helpers/ExcludePassword';
import prisma from '../infrastructure/database/prisma';
import { Prisma } from '@prisma/client';

class SecretaryService {
  async createSecretary(data: Prisma.SecretaryCreateInput) {
    const duplicate = await this.checkIfDuplicate(data.phoneNumber);
    if (duplicate) throw new ConflictError('Phone number already exists');

    return await prisma.secretary.create({ data });
  }

  async checkIfDuplicate(phoneNumber: string) {
    const secretary = await prisma.secretary.findUnique({
      where: { phoneNumber },
    });
    return !!secretary;
  }

  async getSecretaries() {
    return await prisma.secretary.findMany({ select: AdminWithoutPassword });
  }

  async getSecretaryById(id: number) {
    const secretary = await prisma.secretary.findUnique({
      where: { id },
      select: AdminWithoutPassword,
    });

    if (!secretary) {
      throw new NotFoundError('Secretary not found');
    }

    return secretary;
  }

  async updateSecretary(id: number, data: Prisma.SecretaryUpdateInput) {
    const actual_data: any = { ...data };
    if (data.dob) {
      data.dob = new Date(actual_data.dob);
    }
    return await prisma.secretary.update({
      where: { id },
      data,
      select: AdminWithoutPassword,
    });
  }

  async deleteSecretary(id: number) {
    const secretary = await this.getSecretaryById(id);
    if (!secretary) {
      throw new NotFoundError('Secretary not found');
    }
    return await prisma.secretary.delete({ where: { id } });
  }
}

export default new SecretaryService();
