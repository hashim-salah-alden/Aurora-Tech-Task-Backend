import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seedBranchs() {
  await prisma.branch.createMany({
    data: [{ name: 'Sheraton' }, { name: 'New Cairo' }, { name: 'Alexandria' }],
  });
}
seedBranchs();

async function seedSessionTypes() {
  // Seed the session types
  const sessionTypes = [
    { name: 'Recovery', price: 400 },
    { name: 'Physiotherapy', price: 700 },
    { name: 'Personal Trainer', price: 1000 },
  ];

  for (const sessionType of sessionTypes) {
    await prisma.sessionType.create({
      data: sessionType,
    });
  }

  console.log('Session types seeded successfully!');
}

seedSessionTypes()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
