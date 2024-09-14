import { PrismaClient, Trainee } from "@prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
      //   apiKey: process.env.XATA_API_KEY, // Custom configuration if supported
    },
  },
});

prisma
  .$connect()
  .then(() => {
    console.log("Prisma connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to Prisma:", error);
  });

export default prisma;
