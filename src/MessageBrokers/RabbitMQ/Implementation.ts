import { DTOSendMessageStream } from "../../services/DTOs/DTOsendMessageStream";
import { IMessageStream } from "../../services/messageStream/IMessageStream";
import { errorFactory } from "../../utils/errorFactory";
import client, { Connection, Channel } from 'amqplib';
import * as dotenv from 'dotenv'; 
dotenv.config();

export const RabbitMqImplementation = () : IMessageStream =>{

    const getConnection = async ( queue : string ) =>{
        const { MESSAGE_BROKER_HOST } = process.env;
        if(!MESSAGE_BROKER_HOST) return null;
        const connection : Connection = await client.connect(MESSAGE_BROKER_HOST);
        const channel : Channel = await connection.createChannel();
        return channel;
    }

    return{
        sendMessage(data : DTOSendMessageStream ) : Promise<void> {
            return new Promise( async (resolve, reject) =>{
                try {
                    const channel : Channel | null = await getConnection(data.queue);
                    if(!channel) throw errorFactory('Connection error to the message broker');
                    await channel.assertQueue(data.queue);
                    channel.sendToQueue( data.queue, Buffer.from(data.message));
                    await channel.close()
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
    }

}