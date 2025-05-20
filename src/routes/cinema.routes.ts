import { Router } from 'express';
import { createCinema } from '../services/cinema.service';

const router = Router();

router.post('/', createCinema);

export default router;