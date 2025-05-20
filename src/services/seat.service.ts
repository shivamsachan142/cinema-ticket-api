import { Request, Response } from 'express';
import { prisma } from '../utils/db';

export const purchaseSpecificSeat = async (req: Request, res: Response) => {
  const { id, seatNumber } = req.params;

  try {
    const seat = await prisma.$transaction(async (tx) => {
      const [s] = await tx.$queryRawUnsafe<any[]>(
        `SELECT * FROM "Seat" WHERE "cinemaId" = $1 AND "number" = $2 FOR UPDATE`,
        id, Number(seatNumber)
      );

      if (!s) throw new Error('Seat not found');
      if (s.isBooked) throw new Error('Seat already booked');

      return tx.seat.update({
        where: { id: s.id },
        data: { isBooked: true },
      });
    });

    res.json(seat);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const purchaseConsecutiveSeats = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const seats = await tx.$queryRawUnsafe<any[]>(
        `SELECT * FROM "Seat" WHERE "cinemaId" = $1 ORDER BY "number" FOR UPDATE`,
        id
      );

      for (let i = 0; i < seats.length - 1; i++) {
        if (!seats[i].isBooked && !seats[i + 1].isBooked) {
          const [s1, s2] = await Promise.all([
            tx.seat.update({
              where: { id: seats[i].id },
              data: { isBooked: true },
            }),
            tx.seat.update({
              where: { id: seats[i + 1].id },
              data: { isBooked: true },
            }),
          ]);
          return [s1, s2];
        }
      }

      throw new Error('No two consecutive free seats');
    });

    res.json(result);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

