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

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzc1OGFhOGVhM2RmNzVkY2NhYzgwNSIsImlhdCI6MTY0ODA4NTY3Nn0.iJM4b0X9iLilKnjJK3wJZSosnxQIO2rmWQ2tK0qEa8o";
const postId = '6238fa96ff7eb52d8867f485';

test('POST - Testing create comment', async() =>{
    const response = await supertest(app).post('/inn/comment/register').send({
        comment: 'new test - 22:11',
        id: postId
    }).set({
        token: token
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
    const commentId = '';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});

test('Delete - testing delete comment route error handler - not sending token', async ()=>{
    const commentId = '';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`);

    expect(response.statusCode).toBe(406);
});

test('Delete - testing delete comment route - sending wrong token', async ()=>{
    
    const commentId = '';
    const wrongToken = '';

    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token: wrongToken
    });

    expect(response.statusCode).toBe(500);
});