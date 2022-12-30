import supertest from "supertest";
import { app } from '../../app';
import * as dotenv from "dotenv";
dotenv.config();
import Mongoose from "mongoose";

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

const token = '';

test('Testing the create like case', async ()=>{
    const postId = ''
    const response = await supertest(app).post('/inn/like/create').send(
        {
            postId
        }
    ).set({
        token
    });

    expect(response.statusCode).toBe(201);
});

test('Testing the create like error case - not sending token ', async ()=>{
    const postId = ''
    //not sending any token
    const response = await supertest(app).post('/inn/like/create').send(
        {
            postId
        }
    );

    expect(response.statusCode).toBe(406);
});

test('Testing the create like error case - invalid token', async ()=>{
    const postId = ''
    //not sending any token
    const response = await supertest(app).post('/inn/like/create').send(
        {
            postId
        }
    ).set({
        token : 'lorem'
    });

    expect(response.statusCode).toBe(406);
});

test('Remove like',async () => {

    const id = '';

    const response = await supertest(app).delete(`/inn/like/${id}`).set({
        token
    });

    expect(response.statusCode).toBe(200);
});

test('Remove like - testing token validation',async () => {

    const id = '';

    // Not sending token
    const response = await supertest(app).delete(`/inn/like/${id}`);

    expect(response.statusCode).toBe(406);
});

test('Remove like - testing token validation',async () => {

    const id = '';

    // Sending wrong token
    const response = await supertest(app).delete(`/inn/like/${id}`).set({
        token : ''
    });

    expect(response.statusCode).toBe(500);
});