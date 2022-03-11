import supertest from "supertest";
import { app } from '../../app';
import * as dotenv from "dotenv";
dotenv.config();
import Mongoose from "mongoose";

beforeAll(async ()=>{
    const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT } = process.env;


    //BD
    await Mongoose.connect(`mongodb://${DATABASE_USER}:${DATABASE_PASSWORD}@localhost:${DATABASE_PORT}/`).
    catch(
        (e)=>{
            console.log( 'Error ' + e + ' has occuried' );
        }
    );
});
afterAll(async ()=>{
    await Mongoose.disconnect();
});

test('Testing the create community route', async()=>{

    const token = ''

    const response = await supertest(app).post('/inn/community/register').send({
        name: 'Test name2',
        description: "Test description2"
    }).set({
        token: token
    });
    expect(response.statusCode).toBe(201);
});


test('Must return the data of a community ',async()=>{

    const id = '';

    const response = await supertest(app).get(`/inn/community/${id}`);
    expect(response.statusCode).toBe(200);
});


test('This test is suposed to get an error since the id is not valid',async()=>{

    const id = 'not';

    const response = await supertest(app).get(`/inn/community/${id}`);
    expect(response.statusCode).toBe(404);
});

test('This test is suposed to get community data and posts', async ()=>{
    const id = '';
    const page = 1;
    const token = '';

    const response = await supertest(app).get(`/inn/community/${id}/${page}`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(200);
});

test('This test is suposed to get an error since the token is undefined', async ()=>{
    const id = '';
    const page = 1;
    const token = undefined;

    const response = await supertest(app).get(`/inn/community/${id}/${page}`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(406);
});

test('This test is suposed to get an error since the id is invalid', async ()=>{
    const id = 'invalid';
    const page = 1;
    const token = '';

    const response = await supertest(app).get(`/inn/community/${id}/${page}`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(200);
});

test('This test is suposed to get 3 communities from a given user', async ()=>{
    const id = '';
    const page = 1;
    const token = '';

    const response = await supertest(app).get(`/inn/communities`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(200);
});

test('Test if a undefined token get a expected response', async ()=>{
    const token = undefined;

    const response = await supertest(app).get(`/inn/communities`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(406);
});

test('Test if a not registered token get a expected response', async ()=>{
    const token = 'noteregistered';

    const response = await supertest(app).get(`/inn/communities`) .set({
        authorization: token 
    });

    expect(response.statusCode).toBe(406);
});

test('Must get an array of communities using a name as param', async ()=>{
    const name = 'name';

    //gotta get an empty array even if the query don't find any community

    const response = await supertest(app).get(`/inn/communities/${name}`);
    //@ts-ignore
    expect(response.data.communities).toBeTruthy();
});


test('GET testing sub error handler', async ()=>{

    //Must be a invalid token
    const token = undefined;
    const id = '';

    const response = await supertest(app).get('/inn/community/sub').send({
        id: id
    }).set({
        authorization: token
    });

    expect(response.statusCode).toBe(406);
});

test('GET Testing sub', async ()=>{
    const token = '';
    const id = '';

    const response = await supertest(app).get('/inn/community/sub').send({
        id: id
    }).set({
        authorization: token
    });

    expect(response.statusCode).toBe(200);
});

test('GET Testing unsub', async ()=>{
    const token = '';
    const id = '';

    const response = await supertest(app).get('/inn/community/sub').send({
        id: id
    }).set({
        authorization: token
    });

    expect(response.statusCode).toBe(200);
});