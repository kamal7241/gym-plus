// src/controllers/trainee.controller.ts

import { NextFunction, Request, Response } from 'express';
import TraineeService from '../services/trainee.service';
import { Prisma, Trainee } from '@prisma/client';
import traineeService from '../services/trainee.service';
import { NotFoundError } from '../errors/NotFoundError';
import { Bcrypt } from '../helpers/Bcrypt';
import { ConflictError } from '../errors/ConflictError';
import { BadRequestError } from '../errors/BadRequestError';
import { CreateTraineeDTO, UpdateTraineeDTO, UpdateTraineeNotesDTO } from '../dtos/trainee.dto';

export class TraineeController {
  async getTrainees(req: Request, res: Response, next: NextFunction) {
    try {
      const trainees = await traineeService.getTrainees();
      res.status(200).json(trainees);
    } catch (error: any) {
      next(error);
    }
  }

  async getTraineeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const trainee = await traineeService.getTraineeById(id);

      if (!trainee) {
        next(new NotFoundError('Trainee not found'));
        return;
      }

      res.status(200).json(trainee);
    } catch (error: any) {
      next(error);
    }
  }

  async createTrainee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const trainee: CreateTraineeDTO = (req as any).dtoInstance;
      const idImgs: any = req.files;

      // Validate files presence
      if (!idImgs || !idImgs.idFace || !idImgs.idBack) {
        throw new BadRequestError({
          idImages: ['idFace and idBack are required'],
        });
      }

      const { password, ...newTrainee } = await traineeService.createTrainee(
        trainee
      );
      res.status(201).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }

  async updateTrainee(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const trainee: UpdateTraineeDTO = (req as any).dtoInstance;

      const { password, ...newTrainee } = await traineeService.updateTrainee(
        +id,
        trainee
      );
      res.status(200).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }

  async updateTraineeNotes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const trainee: UpdateTraineeNotesDTO = (req as any).dtoInstance;

      const { password, ...newTrainee } = await traineeService.updateTraineeNotes(
        +id,
        trainee
      );
      res.status(200).json(newTrainee);
    } catch (error: any) {
      next(error);
    }
  }
}

export default new TraineeController();
