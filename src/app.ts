import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errorMiddleware';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/inn/uploads', express.static(path.resolve(__dirname, '..', 'uploads',)))
app.use('/inn', router);
app.use(errorMiddleware);

export { app };