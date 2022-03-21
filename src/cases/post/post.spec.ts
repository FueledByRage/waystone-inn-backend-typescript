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

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZmE4ODA1M2IxZmVjMDA4OGU5YTYyOCIsImlhdCI6MTY0NzcyOTc3OH0.JDS60m5qKPcupqCuda0bKoLKDkctqP4Mx2eIix7pd5o';
const id = '622d447924fbd61afca14466';

test('Create post test - POST', async ()=>{
    const response = await supertest(app).post(`/inn/post/register`).send({
        title: 'About me',
        body: '',
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

test('GET - Get post with pagination', async()=>{

    const page = 0;;
    const registers = 3;

    const response = await supertest(app).get(`/inn/post/${id}/${page}/${registers}`);

    expect(response.statusCode).toBe(200);
});

test('GET - Get post with pagination - get a error since the token is not valid', async()=>{

    const page = 0;
    const registers = 3;

    const response = await supertest(app).get(`/inn/post/${id}/${page}/${registers}`).set({
        token: 'invalidtoken'
    });

    expect(response.statusCode).toBe(406);
});