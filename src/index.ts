import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { router } from './router';
import cors from './app/middleware/cors';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

dotenv.config();

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URI || '');

app.use(cors);
app.use(express.json());
app.use(router);

app.listen(3000);

export default app;
