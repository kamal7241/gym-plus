import { seedCoach } from './seeds/seedCoach';
import { seedSecretary } from './seeds/seedSecretary';
import { seedTrainee } from './seeds/seedTrainee';

async function main() {
  await seedCoach();
  await seedSecretary();
  await seedTrainee();
}

main()
  .then(() => {
    console.log('Seeding completed');
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
  });
