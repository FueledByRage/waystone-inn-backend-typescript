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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTc0MjA2ZmQxOTc1YTdhYTAwMDJjMyIsImlhdCI6MTY3MzI2NjA5M30.3Vy10jMYi3eJ1656JAPx23g4ubnhdQ_FbVwne1pEMUY';

test('Remove like',async () => {

    const id = '6391df029b9b8e3eb8e69e86';

    const response = await supertest(app).delete(`/inn/like/${id}`).set({
        token
    });

    expect(response.statusCode).toBe(204);
});

test('Testing the create like case', async ()=>{
    const postId = '6391df029b9b8e3eb8e69e86'
    const response = await supertest(app).get(`/inn/like/create/${postId}`).set({
        token
    });

    expect(response.statusCode).toBe(201);
});

test('Testing the create like error case - not sending token ', async ()=>{
    const postId = '6391df029b9b8e3eb8e69e86'
    //not sending any token
    const response = await supertest(app).get(`/inn/like/create/${postId}`);

    expect(response.statusCode).toBe(406);
});

test('Testing the create like error case - invalid token', async ()=>{
    const postId = '6391df029b9b8e3eb8e69e86'
    //not sending any token
    const response = await supertest(app).get(`/inn/like/create/${postId}`).set({
        token : 'lorem'
    });

    expect(response.statusCode).toBe(406);
});
test('Remove like - testing token validation',async () => {

    const id = '6391df029b9b8e3eb8e69e86';

    // Sending wrong token
    const response = await supertest(app).delete(`/inn/like/${id}`).set({
        token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MzI2NzAyMn0.Rca-zG0KswkV27pgqrMme_90QyYtYGtJuz6YMhFc7j8'
    });

    expect(response.statusCode).toBe(500);
});



test('Remove like - testing token validation',async () => {

    const id = '6391df029b9b8e3eb8e69e86';

    // Not sending token
    const response = await supertest(app).delete(`/inn/like/${id}`);

    expect(response.statusCode).toBe(406);
});
