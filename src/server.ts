import { app } from "./app";
import * as dotenv from 'dotenv';
import Mongoose from "mongoose";

dotenv.config();

//@ts-ignore
Mongoose.connect(process.env.MONGODB_URL, ()=>{
    console.log('Database connected');
});

app.listen(process.env.PORT, ()=>{
    console.log('running');
});