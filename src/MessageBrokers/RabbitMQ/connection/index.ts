import client, { Connection, Channel } from 'amqplib';
import * as dotenv from 'dotenv'; 
dotenv.config();

export const getChannel = async ( queue : string ) =>{
    const { MESSAGE_BROKER_HOST } = process.env;
    if(!MESSAGE_BROKER_HOST) return null;
    const connection : Connection = await client.connect(MESSAGE_BROKER_HOST);
    const channel : Channel = await connection.createChannel();
    return channel
}