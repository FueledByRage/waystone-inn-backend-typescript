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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTFkZjA0YmM3M2U0MDg1NGQ5NzA2YyIsImlhdCI6MTY3MjQxMDk2NH0.VPzxlKtvVT8KOWwG6miXc19JxiGZi6nakSsN8uubjaM';
const id = '639b4fc888f1d73054943373';

test('Testing the create community route', async()=>{
    const response = await supertest(app).post('/inn/community/register').send({
        name: 'CP9',
        description: "30/12/2022"
    }).set({
        token
    });
    expect(response.statusCode).toBe(201);
});


test('Must return the data of a community ',async()=>{
    const response = await supertest(app).get(`/inn/community/read/${id}`);
    expect(response.statusCode).toBe(200);
});


test('This test is suposed to get an error since the id is not valid',async()=>{

    const response = await supertest(app).get(`/inn/community/not`);
    expect(response.statusCode).toBe(404);
});


test('Must get an array of communities using a name as param', async ()=>{
    const name = 'Community';

    //gotta get an empty array even if the query don't find any community

    const response = await supertest(app).get(`/inn/communities/${name}`);

    expect(response.statusCode).toBe(200);
});


test('GET Testing get communities by author route - Not sending authorization token', async ()=>{

    //Not sending authorization token
    const response = await supertest(app).get('/inn/communities');

    expect(response.statusCode).toBe(406)
});

test('GET Testing get communities by author route', async ()=>{

    const response = await supertest(app).get('/inn/communities').set({
        token
    });

    expect(response.statusCode).toBe(200);
});