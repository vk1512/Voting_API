import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

router.post("/", async (req, res) => {
  const { name, email, passwordHash } = req.body;
  try {
    const user = await prisma.user.create({ data: { name, email, passwordHash } });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  res.json(await prisma.user.findMany());
});

export default router;
