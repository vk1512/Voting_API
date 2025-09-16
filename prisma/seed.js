import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "test@example.com" },
    update: {},
    create: {
      name: "Test User",
      email: "test@example.com",
      passwordHash: "hashedpassword123"
    },
  });

  const poll = await prisma.poll.create({
    data: {
      question: "What’s your favorite programming language?",
      creatorId: user.id,
      options: {
        create: [
          { text: "JavaScript" },
          { text: "Python" },
          { text: "Java" },
        ],
      },
    },
    include: { options: true },
  });

  console.log("Seeded:", { user, poll });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
