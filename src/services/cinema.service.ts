import { Request, Response } from 'express';
import { prisma } from '../utils/db';

export const createCinema = async (req: Request, res: Response) => {
  const { seatCount } = req.body;
  if (!seatCount || seatCount <= 0) {
    return res.status(400).json({ error: 'seatCount must be > 0' });
  }

  const cinema = await prisma.cinema.create({
    data: {
      seatCount,
      seats: {
        create: Array.from({ length: seatCount }, (_, i) => ({ number: i + 1 })),
      },
    },
  });

  res.json({ cinemaId: cinema.id });
};