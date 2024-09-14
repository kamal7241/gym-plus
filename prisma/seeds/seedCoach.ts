import { Prisma, PrismaClient } from '@prisma/client';
import { Bcrypt } from './../../src/helpers/Bcrypt';

const prisma = new PrismaClient();

export async function seedCoach() {
  try {
    const coachData: Prisma.CoachCreateInput = {
      phoneNumber: '0123456789',
      fullName: 'John Doe',
      gender: 'MALE',
      dob: new Date('1990-01-01'),
      password: await Bcrypt.hash('123456789'),
    };

    // Seed the coach data
    const createdCoach = await prisma.coach.create({
      data: coachData,
    });

    console.log('Coach seeded successfully:', createdCoach);
  } catch (error) {
    console.error('Error seeding coach data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
