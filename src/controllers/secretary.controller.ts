// src/controllers/secretary.controller.ts
import { Request, Response, NextFunction } from 'express';
import SecretaryService from '../services/secretary.service';
import { Bcrypt } from './../helpers/Bcrypt';
import { NotFoundError } from '../errors/NotFoundError';
import { CreateSecretaryDTO, UpdateSecretaryDTO } from '../dtos/secretary.dto';

class SecretaryController {
  async createSecretary(req: Request, res: Response, next: NextFunction) {
    try {
      let { confirm_password, ...secretaryData }: CreateSecretaryDTO = req.body;
      const data = {
        ...secretaryData,
        dob: new Date(secretaryData.dob),
        password: await Bcrypt.hash(secretaryData.password),
      };

      const { password, ...secretary } = await SecretaryService.createSecretary(
        data
      );

      res.status(201).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async getSecretaries(req: Request, res: Response, next: NextFunction) {
    try {
      const secretaries = await SecretaryService.getSecretaries();
      res.status(200).json(secretaries.map(({ password, ...rest }) => rest));
    } catch (error: any) {
      next(error);
    }
  }

  async getSecretaryById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const secretary: any = await SecretaryService.getSecretaryById(+id);

      res.status(200).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async updateSecretary(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      let secretaryData: UpdateSecretaryDTO = req.body;

      const secretary = await SecretaryService.updateSecretary(+id, {
        ...secretaryData,
      });

      res.status(200).json(secretary);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteSecretary(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      await SecretaryService.deleteSecretary(Number(id));
      res.status(200).json({ message: 'Secretary deleted successfully' });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new SecretaryController();
