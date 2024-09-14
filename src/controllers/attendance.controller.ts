// src/controllers/attendance.controller.ts

import { Request, Response, NextFunction } from 'express';
import AttendanceService from '../services/attendance.service';

class AttendanceController {
  async createAttendance(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { parcode } = req.params;
      const newAttendee = await AttendanceService.createAttendance(parcode);

      res.status(201).json(newAttendee);
    } catch (error: any) {
      next(error);
    }
  }

  async getAllAttendances(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const attendances = await AttendanceService.getAllAttendances();
      res.status(200).json(attendances);
    } catch (error: any) {
      next(error);
    }
  }

  async getAttendanceByTraineeId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { traineeId } = req.params;
      const attendances = await AttendanceService.getAttendanceByTraineeId(
        +traineeId
      );
      res.status(200).json(attendances);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteAttendanceById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { attendanceId } = req.params;
      const attendance = await AttendanceService.deleteAttendanceById(
        +attendanceId
      );
      res.status(200).json({ success: true, message: 'attendance deleted successfully'});
    } catch (error: any) {
      next(error);
    }
  }
}

export default new AttendanceController();
