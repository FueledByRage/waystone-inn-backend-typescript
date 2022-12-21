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

// token from an already registered user and id from a valid community
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MTExNDU2MX0.ZGq1ou8gHRuFvZmXG6XKxkpusmkzyYwF5up1R4uSh8s';
const id = '62386d22c2f3f0cc6314b693';


test('Create post test - POST', async ()=>{
    const response = await supertest(app).post(`/inn/post/register`).send({
        title: 'New Post',
        body: 'new - 22/03/2022 - 09:22',
        id: id
    }).set({
        token: token
    });

    expect(response.statusCode).toBe(201);
});

test('Create post error handler test - POST',async ()=>{
    //Not sending authorization token
    const response = await supertest(app).post(`/inn/post/register`).send({
        title: 'Test post',
        body: 'A test post',
        id: id
    });

    expect(response.statusCode).toBe(406);
});

test('GET - Get posts with pagination', async()=>{

    const page = 1;
    const registers = 3;

    const response = await supertest(app).get(`/inn/posts/${id}/${page}/${registers}`).set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});

test('GET - Get posts with pagination - get a error since the token is not valid', async()=>{

    const page = 1;
    const registers = 3;

    const response = await supertest(app).get(`/inn/posts/${id}/${page}/${registers}`).set({
        token: 'invalidtoken'
    });

    expect(response.statusCode).toBe(406);
});

test('GET - Get posts feed with pagination', async()=>{
    const page = 1;
    const registers = 3;

    const response = await supertest(app).get(`/inn/feed/${page}/${registers}`).set({
        token
    });

    expect(response.statusCode).toBe(200);
});

test('GET - Get posts feed with pagination - get a error since the token is not valid', async()=>{

    const page = 1;
    const registers = 3;

    //Not sending token
    const response = await supertest(app).get(`/inn/feed/${page}/${registers}`);

    expect(response.statusCode).toBe(406);
});

test('GET - Get post data', async ()=>{
    let postId = '63a06a544cfe4b5f254a1bee';

    const response = await supertest(app).get(`/inn/post/${postId}`).set({
        token
    });

    expect(response.statusCode).toBe(200);
});


test('GET - Get post data without token', async ()=>{
    let postId = '63a06a544cfe4b5f254a1bee';

    const response = await supertest(app).get(`/inn/post/${postId}`);

    expect(response.statusCode).toBe(200);
});

test('GET - Get post data - expect error since the id is not valid', async()=>{

    let postId = 'not'
    const response = await supertest(app).get(`/inn/post/${postId}`);

    expect(response.statusCode).toBe(404);
});

test('DELETE - Delete a post', async ()=>{
    let postId = '63a070dbdb5ef6db4a517701';
    const response = await supertest(app).delete(`/inn/post/${postId}`).set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});

test('DELETE - Testing delete post authorization', async ()=>{
    let postId = '63a070dbdb5ef6db4a517701';

    //not sending a token
    const response = await supertest(app).delete(`/inn/post/${postId}`);

    expect(response.statusCode).toBe(406);
});

test('DELETE - Testing delete post sending a not authorized token', async ()=>{
    
    let postId = '63a070dbdb5ef6db4a517701';
    let invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzc1OGFhOGVhM2RmNzVkY2NhYzgwNSIsImlhdCI6MTY0Nzk1OTY2OH0.ewFs9LKxo_mCm7NZJCZu2qIbwwIopyeSY2dXEl4hUag';

    //Sending a invalid token -
    const response = await supertest(app).delete(`/inn/post/${postId}`).set({
        token: invalidToken
    });

    expect(response.statusCode).toBe(406);
});