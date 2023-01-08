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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOTc0MjA2ZmQxOTc1YTdhYTAwMDJjMyIsImlhdCI6MTY3MzE4MjI5NH0.jXPDZoElXQz-j1NPZyC20QDgRLZhMz4cfhWBfWYrfpQ';
const communityId = '63b9f5cf35c924c0cd02c97f';

test('This test must delete a sub register',async () => {
    const response = await supertest(app).delete(`/inn/sub/delete/${communityId}`).set({
        token
    });

    expect(response.statusCode).toBe(200);
});
test('Create a subscription ', async () => {
    
    const response = await supertest(app).get(`/inn/sub/${communityId}`).set({
        token
    });

    expect(response.statusCode).toBe(201);
});

test('Create a subscription - validation', async () => {
    
    // not sending token
    const response = await supertest(app).get(`/inn/sub/${communityId}`);

    expect(response.statusCode).toBe(406);
});

test('Create a subscription - already subscribed', async () => {
    
    const response = await supertest(app).get(`/inn/sub/${communityId}`).set({
        token
    });

    expect(response.statusCode).toBe(406);
});


test('This test must get an authentication error trying to delete a sub register without a token',async () => {
    const response = await supertest(app).delete(`/inn/sub/delete/${communityId}`);
    expect(response.statusCode).toBe(406);
});

test('This test must get an authentication error trying to delete a sub no registered',async () => {
    
    const notRegisteredToken = '';
    
    const response = await supertest(app).delete(`/inn/sub/delete/${communityId}`).set({
        token : notRegisteredToken
    });

    expect(response.statusCode).toBe(500);
});