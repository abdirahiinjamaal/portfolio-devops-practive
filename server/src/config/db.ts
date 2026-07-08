import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI || '';
  if (!uri) {
    console.warn('MONGODB_URI not set — skipping MongoDB connection. Contact form will be disabled.');
    return;
  }
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error — continuing without database:', (err as Error).message);
  }
}
