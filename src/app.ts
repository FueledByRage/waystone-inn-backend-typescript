import express from 'express';
import { router } from './routes';
import cors from 'cors';
import { errorMiddleware } from './middlewares/errorMiddleware';

const allowedOrigins = ['*'];

const options: cors.CorsOptions = {
    allowedHeaders: '*'/*[
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ]*/,
    preflightContinue: false,
    origin: '*',
    methods: '*'
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/inn', router);
app.use(errorMiddleware);

export { app };