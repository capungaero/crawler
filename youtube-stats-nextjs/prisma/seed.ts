import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed data for YouTube channel statistics
  const channels = [
    {
      name: 'Channel One',
      subscriberCount: 1000,
      totalViews: 50000,
      totalVideos: 20,
    },
    {
      name: 'Channel Two',
      subscriberCount: 2000,
      totalViews: 150000,
      totalVideos: 50,
    },
    {
      name: 'Channel Three',
      subscriberCount: 500,
      totalViews: 25000,
      totalVideos: 10,
    },
  ];

  for (const channel of channels) {
    await prisma.channel.create({
      data: channel,
    });
  }

  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });