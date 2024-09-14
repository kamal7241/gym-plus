import { Prisma, PrismaClient } from '@prisma/client';
import { Bcrypt } from './../../src/helpers/Bcrypt';

const prisma = new PrismaClient();

export async function seedTrainee() {
  try {
    const traineeData: Prisma.TraineeCreateInput = {
      parcode: '1',
      phoneNumber: '01019818304',
      fullName: 'نوران علي',
      gender: 'FEMALE',
      trainingName: "تدريب 2",
      dob: new Date('2001-07-23'),
      password: await Bcrypt.hash('01019818304'),
      subscriptionType: 'PRIVATE',
      subscriptionStatus: 'ACTIVE',
      subscriptionDate: new Date(),
      subscriptionStartDate: new Date(),
      subscriptionMonths: 12,
      subscriptionClasses: 20,
      remainingClasses: 15,
      subscriptionEndDate: new Date(),
      paid: 500,
      reminder: 1,
      surgeries: false,
    };

    // Seed the trainee data
    const createdTrainee = await prisma.trainee.create({
      data: traineeData,
    });

    console.log('Trainee seeded successfully:', createdTrainee);
  } catch (error) {
    console.error('Error seeding trainee data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
