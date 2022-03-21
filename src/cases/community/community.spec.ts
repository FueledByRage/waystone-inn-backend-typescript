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

// token from an already registered user and a valid community id
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzg2YzZkYjI0MDVjNmZjZmE5NzcyOCIsImlhdCI6MTY0Nzg3MzU5NX0.iVXAjDrLMzsfXBWupT3ZlQWI2ZBvtSzaRrn9thsNBNM';
const id = '62386d22c2f3f0cc6314b693';

test('Testing the create community route', async()=>{
    const response = await supertest(app).post('/inn/community/register').send({
        name: 'Navy',
        description: "Test description - 21/03/2022 "
    }).set({
        token: token
    });
    expect(response.statusCode).toBe(201);
});


test('Must return the data of a community ',async()=>{
    const response = await supertest(app).get(`/inn/community/${id}`);
    expect(response.statusCode).toBe(200);
});


test('This test is suposed to get an error since the id is not valid',async()=>{

    const response = await supertest(app).get(`/inn/community/not`);
    expect(response.statusCode).toBe(404);
});


test('This test is suposed to get 3 communities from a given user', async ()=>{

    const response = await supertest(app).get(`/inn/communities`).set({
        token: token 
    });

    expect(response.statusCode).toBe(200);
});

test('Test if a undefined token get a expected response', async ()=>{

    const response = await supertest(app).get(`/inn/communities`);

    expect(response.statusCode).toBe(406);
});

test('Test if a not registered token get a expected response', async ()=>{
    const invalidToken = 'noteregistered';

    const response = await supertest(app).get(`/inn/communities`) .set({
        token: invalidToken 
    });

    expect(response.statusCode).toBe(406);
});

test('Must get an array of communities using a name as param', async ()=>{
    const name = 'Community';

    //gotta get an empty array even if the query don't find any community

    const response = await supertest(app).get(`/inn/communities/${name}`);

    //@ts-ignore
    expect(response.statusCode).toBe(200);
});


test('GET testing sub error handler', async ()=>{

    //Not sending token

    const response = await supertest(app).get(`/inn/community/sub/${id}`);

    expect(response.statusCode).toBe(406);
});

test('GET Testing sub', async ()=>{

    const response = await supertest(app).get(`/inn/community/sub/${id}`).set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});


test('GET Testing unsub', async ()=>{

    const response = await supertest(app).get(`/inn/community/unsub/${id}`).set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});

test('GET Testing get communities by author route - Not sending authorization token', async ()=>{

    //Not sending authorization token
    const response = await supertest(app).get('/inn/communities');

    expect(response.statusCode).toBe(406)
});

test('GET Testing get communities by author route', async ()=>{

    const response = await supertest(app).get('/inn/communities').set({
        token: token
    });

    expect(response.statusCode).toBe(200);
});