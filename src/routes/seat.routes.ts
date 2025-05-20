import { Router } from 'express';
import {
  purchaseSpecificSeat,
  purchaseConsecutiveSeats,
} from '../services/seat.service';

const router = Router();

router.post('/:id/seats/:seatNumber/purchase', purchaseSpecificSeat);
router.post('/:id/seats/auto-purchase', purchaseConsecutiveSeats);

export default router;