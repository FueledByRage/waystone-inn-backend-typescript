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
    const response = await supertest(app).post('/inn/community/register').send({
        name: 'Test name2',
        description: "Test description2"
    }).set({
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE4ODA1M2IxZmVjMDA4OGU5YTYyOCIsImlhdCI6MTY0Mzk3NzY2N30.TYCU6uPFh22qyrfZiCdF-gJNgTWrabCqqPnKTi_wdK4'
    });
    expect(response.statusCode).toBe(201);
});

/*
test('Must return the data of a community ',async()=>{
    const response = await supertest(app).get('/inn/community/idhere');
    expect(response.statusCode).toBe(200);
});*/