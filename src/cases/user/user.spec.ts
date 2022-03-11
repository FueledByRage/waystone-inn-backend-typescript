import { app } from "../../app";
import  Mongoose  from "mongoose";
import * as dotenv from "dotenv";
import supertest from "supertest";
dotenv.config();

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

test('Testing the user register - Not sending params',async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
        //Not sending any params    
    });
    expect(response.statusCode).toBe(406);
});

test('Testing the user register',async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
       name: 'Erik Natan',
       user: 'Example',
       email: 'Example@gmail.com',
       password: 'senha123'

    });
    expect(response.statusCode).toBe(201);
});

test('Login with wrong params', async ()=>{

    const response = await supertest(app).post('/inn/user/login').send({
        email: 'Example@gmail.com',
        password: 'senha1234'
    });

    expect(response.statusCode).toBe(406);
    
});

test('Test the login route', async()=>{
    const response = await supertest(app).post('/inn/user/login').send({
        email: 'Example@gmail.com',
        password: 'senha123'
    });

    expect(response.statusCode).toBe(200);
});