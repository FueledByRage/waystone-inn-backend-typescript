import { app } from "./app";
import * as dotenv from 'dotenv';
import Mongoose from "mongoose";
dotenv.config();

const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_NAME, API_PORT } = process.env

//BD
Mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`).
then(()=>{
    console.log('Connected');
    //console.log(`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/`);
}).catch(
    (e)=>{
        console.log( 'Error ' + e + ' has occuried' )
    }
);


app.listen(API_PORT, ()=>{
    console.log('running');
});