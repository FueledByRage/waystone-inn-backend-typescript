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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MTYzMTIyMn0.YOHp_R5PlLTDDei9WFpMJiIx7-T3ljcrbHCKV8ugTwU';
const postId = '63a1a57a11d68a5aa2295301';

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
    const commentId = '6391df021af7227e7b75990f';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token
    });

    expect(response.statusCode).toBe(200);
});

test('Delete - testing delete comment route error handler - not sending token', async ()=>{
    const commentId = '63a3125e6d09ce7d2b5fe0ab';
    const response = await supertest(app).delete(`/inn/comment/${commentId}`);

    expect(response.statusCode).toBe(406);
});

test('Delete - testing delete comment route - sending wrong token', async ()=>{
    
    const commentId = '63a11025c882386a05b758fe';
    const wrongToken = token;

    const response = await supertest(app).delete(`/inn/comment/${commentId}`).set({
        token: wrongToken
    });

    expect(response.statusCode).toBe(406);
});