import mongoose from 'mongoose';
import { env } from '../../config/env';

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

export function connectDB() {
  return new Promise<typeof mongoose>((resolve, reject) => {
    const mongoURL = env.dbURI;
    mongoose
      .connect(mongoURL, mongoOptions)
      .then((conn) => {
        resolve(conn);
      })
      .catch((error) => reject(error));
  });
}
