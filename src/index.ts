import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cinemaRoutes from './routes/cinema.routes';
import seatRoutes from './routes/seat.routes';

const app = express();
dotenv.config();

app.use(bodyParser.json());

app.use('/cinemas', cinemaRoutes);
app.use('/cinemas', seatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
