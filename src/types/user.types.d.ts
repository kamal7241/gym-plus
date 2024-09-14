import { Coach, Secretary, Trainee } from '@prisma/client';

declare enum UserType {
  COACH,
  SECRETARY,
  TRAINEE,
}

export interface User extends Coach, Secretary, Trainee {
  userType: UserType;
}
