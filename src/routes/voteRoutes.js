import { Router } from "express";

const router = Router();

export default (io, prisma) => {
  router.post("/", async (req, res) => {
    const { userId, optionId } = req.body;
    try {
      const vote = await prisma.vote.create({ data: { userId, optionId } });

      // Broadcast updated poll results
      const option = await prisma.pollOption.findUnique({
        where: { id: optionId },
        include: { poll: true },
      });
      const pollId = option.pollId;

      const pollWithVotes = await prisma.poll.findUnique({
        where: { id: pollId },
        include: { options: { include: { votes: true } } },
      });

      io.to(`poll_${pollId}`).emit("voteUpdate", pollWithVotes);

      res.json(vote);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  return router;
};
