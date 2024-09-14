import { Prisma, PrismaClient } from '@prisma/client';
import { Bcrypt } from './../../src/helpers/Bcrypt';

const prisma = new PrismaClient();

export async function seedSecretary() {
  try {
    const secretaryData: Prisma.SecretaryCreateInput = {
      phoneNumber: '0987654321',
      fullName: 'Jane Doe',
      gender: 'FEMALE',
      dob: new Date('1992-02-02'),
      password: await Bcrypt.hash('987654321'),
    };

    // Seed the secretary data
    const createdSecretary = await prisma.secretary.create({
      data: secretaryData,
    });

    console.log('Secretary seeded successfully:', createdSecretary);
  } catch (error) {
    console.error('Error seeding secretary data:', error);
  } finally {
    await prisma.$disconnect();
  }
}
