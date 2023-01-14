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

test('Testing the user register - Not sending params',async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
        //Not sending any params    
    });
    expect(response.statusCode).toBe(406);
});

test('Testing the user register',async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
       name: 'Erik Natan',
       user: 'PaçocaDoce',
       email: 'ExamplePa@gmail.com',
       password: 'senha123'

    });
    expect(response.statusCode).toBe(201);
});

test('Testing the email validation on create a new user',async () => {
    const response = await supertest(app).post('/inn/user/register').send({
        name: 'Erik Natan',
        user: 'PaçocaDoce',
        email: '@gmail.com',
        password: 'senha123'
 
     });
     expect(response.statusCode).toBe(406);
})

test('Login with wrong params', async ()=>{

    const response = await supertest(app).post('/inn/user/login').send({
        email: 'Example@gmail.com',
        password: 'senha1234'
    });

    expect(response.statusCode).toBe(406);
    
});


test('Login with a not registered email', async () => {
    const response = await supertest(app).post('/inn/user/login').send({
        email: 'random@gmail.com',
        password: 'senha123'
    })

    expect(response.statusCode).toBe(406);
})

test('Test the login route', async()=>{
    const response = await supertest(app).post('/inn/user/login').send({
        email: 'Example@gmail.com',
        password: 'senha123'
    });

    expect(response.statusCode).toBe(200);
});

test('Test the get user by username', async ()=>{
    const response = await supertest(app).get('/inn/user/Example');
    expect(response.statusCode).toBe(200);
});


test('Trying to register a taken username', async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
        name: 'Erik Natan',
        user: 'Example',
        email: 'Example1@gmail.com',
        password: 'senha123'
 
     });
     expect(response.statusCode).toBe(406);
});

test('Update user test', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjlhOTg1YzRmYzA3MDY1ZjkwNDg2MSIsImlhdCI6MTY3MzQ0MzczNH0.nP90fyl3O92uifmfJwMUoz7eFXffl1LWOAj1YwOlCOQ';
   const response = await supertest(app).put('/inn/user/update').send({
        username: 'Panetone' 
   }).set({
        token
   });
   
   expect(response.statusCode).toBe(201);
});

test('Testing the update user error handler', async () => {

    //Not sending token
    

    const response = await supertest(app).put('/inn/user/update').send({
     username: 'Chocolate' 
    });
    
    expect(response.statusCode).toBe(406);
 });