import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import healthRouter from './routes/health';
import contactRouter from './routes/contact';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/contact', contactRouter);

app.use(errorHandler);

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
