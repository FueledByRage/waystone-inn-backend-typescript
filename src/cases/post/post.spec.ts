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
        body: 'Sou apaixonado pela ideia de poder criar novas coisas onde a criatividade é o limite, por isso amo tecnologia desde quando era mais novo. Minha foco atual tem sido em desenvolvimento web usando javascript e suas diversas ferramentas, mas estou sempre buscando expandir meus conhecimentos.  Minha rotina de estudos consiste em aperfeiçoar meus conhecimentos para garantir qualidade em meus projetos.',
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