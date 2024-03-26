import 'dotenv/config';

import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
import { router } from './router';
import cors from './app/middleware/cors';
import { env } from './config/env';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.set('strictQuery', true);
mongoose.connect(env.dbURI);

app.use(cors);
app.use(express.json());
app.use(router);


app.listen(3000).on('listening', () => {
  console.log('Server running on port 3000!');
});


export default app;
