import { app } from "../../app";
import  Mongoose  from "mongoose";
import * as dotenv from "dotenv";
import supertest from "supertest";
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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MzQ1NDE2N30.nKpSm93yLXeQvgGKSBF4waU-zYfapWS4WaFaF8i7erM';
const postId = '63a06e07b96cb574e5e10e78';

test('POST - Testing create comment', async() =>{
    const response = await supertest(app).post('/inn/comment/register').send({
        comment: 'new test - 11/01',
        id: postId
    }).set({
        token
    });
    expect(response.statusCode).toBe(201);
});

test('POST - Testing create comment authorization handler', async() =>{
    
    //not sending authorization token
    const response = await supertest(app).post('/inn/comment/register').send({
        comment: 'test',
        id: postId
    });
    expect(response.statusCode).toBe(406);

});

test('GET - Testing get comments route', async()=>{

    const response = await supertest(app).get(`/inn/comments/${postId}`);

    expect(response.statusCode).toBe(200);
});

test('Delete - testing delete comment route', async ()=>{
    const commentId = '63a31d2d553b3fafce549a48';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token
    });

    expect(response.statusCode).toBe(204);
});

test('Delete - testing delete comment route error handler - not sending token', async ()=>{
    const commentId = '63a3125e6d09ce7d2b5fe0ab';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`);

    expect(response.statusCode).toBe(406);
});

test('Delete - testing delete comment route - sending wrong token', async ()=>{
    
    const commentId = '63a31dc6049631a0ec53b4e0';
    const wrongToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjlhOTg1YzRmYzA3MDY1ZjkwNDg2MSIsImlhdCI6MTY3MzQ0MzczNH0.nP90fyl3O92uifmfJwMUoz7eFXffl1LWOAj1YwOlCOQ';;

    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token: wrongToken
    });

    expect(response.statusCode).toBe(406);
});