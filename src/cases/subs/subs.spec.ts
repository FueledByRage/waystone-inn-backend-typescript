import { app } from "../../app";
import  Mongoose  from "mongoose";
import * as dotenv from "dotenv";
import supertest from "supertest";
import { text } from "express";
dotenv.config();

beforeAll(async ()=>{
    const {  DATABASE_NAME } = process.env;


    //BD
    await Mongoose.connect(`mongodb://localhost:27017/${DATABASE_NAME}`).
    catch(
        (e)=>{
            console.log( 'Error ' + e + ' has occuried' );
        }
    );
});

afterAll(async ()=>{
    await Mongoose.disconnect();
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MjQxMDk2NH0.VPzxlKtvVT8KOWwG6miXc19JxiGZi6nakSsN8uubjaM';
const communityId = '63aef96d705db24daf028278';

test('Create a subscription ', async () => {
    
    const response = await supertest(app).get(`/inn/sub/${communityId}`).set({
        token
    });

    expect(response.statusCode).toBe(201);
});

test('Create a subscription - validation', async () => {
    
    // not sending token
    const response = await supertest(app).get(`/inn/sub/${communityId}`);

    expect(response.statusCode).toBe(406);
});

/*test('Create a subscription - already subscribed', async () => {
    
    const response = await supertest(app).get(`/inn/sub/${communityId}`).set({
        token
    });

    expect(response.statusCode).toBe(406);
});*/

