import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { question, options, creatorId } = req.body;
  try {
    const poll = await prisma.poll.create({
      data: {
        question,
        creatorId,
        options: { create: options.map(text => ({ text })) },
      },
      include: { options: true },
    });
    res.json(poll);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const poll = await prisma.poll.findUnique({
    where: { id: Number(req.params.id) },
    include: { options: { include: { votes: true } } },
  });
  res.json(poll);
});

export default router;
