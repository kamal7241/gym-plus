import { Bcrypt } from './../helpers/Bcrypt';
// src/controllers/coach.controller.ts

import { NextFunction, Request, Response } from 'express';
import CoachService from '../services/coach.service';
import { ConflictError } from '../errors/ConflictError';

class CoachController {
  async createCoach(req: Request, res: Response, next: NextFunction) {
    try {
      // Destructure confirm_password from request body
      const { confirm_password, ...coachData } = req.body;

      // Ensure dob is converted to Date object
      coachData.dob = new Date(coachData.dob);

      // Hash password using Bcrypt
      const hashedPassword = await Bcrypt.hash(coachData.password);

      // Replace plain password with hashed password in coachData
      const data = {
        ...coachData,
        password: hashedPassword,
      };

      const duplicate = await CoachService.checkIfDuplicate(data.phoneNumber);
      if (duplicate) {
        next(new ConflictError('Phone number already exists'));
      }
      // Call CoachService to create coach
      const {password, ...coach} = await CoachService.createCoach(data);

      // Return created coach
      res.status(201).json(coach);
    } catch (error: any) {
      // Handle errors
      console.log(error);
      next(error);
    }
  }

  async updateCoach(req: Request, res: Response, next: NextFunction) {
    try {
      const coach = await CoachService.updateCoach(+req.params.id, req.body);
      res.status(200).json(coach);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCoach(req: Request, res: Response, next: NextFunction) {
    try {
      await CoachService.deleteCoach(+req.params.id);
      res.status(204).send();
    } catch (error: any) {
      next(error);
    }
  }

  async getCoach(req: Request, res: Response, next: NextFunction) {
    try {
      const coach = await CoachService.getCoachById(+req.params.id);
      res.status(200).json(coach);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllCoaches(req: Request, res: Response, next: NextFunction) {
    try {
      const coaches = await CoachService.getCoaches();
      res.status(200).json(coaches);
    } catch (error: any) {
      next(error);
    }
  }

  // Add other controller methods as needed...
}

export default new CoachController();
