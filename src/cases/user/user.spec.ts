import { app } from "../../app";
import  mongoose  from "mongoose";
import * as dotenv from "dotenv";
import supertest from "supertest";
dotenv.config();

beforeAll(async ()=>{
    await mongoose.connect(process.env.MONGODB_URL || '').then(()=>{
        console.log('Connecterd to database');
    })
});

afterAll(async ()=>{
    await mongoose.disconnect();
});

test('Testing the user register - Not sending params',async ()=>{
    const response = await supertest(app).post('/inn/user/register').send({
        //Not sending any params    
    });
    expect(response.statusCode).toBe(406);
});