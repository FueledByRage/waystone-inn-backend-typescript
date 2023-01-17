import { Channel } from "amqplib";
import { DTOSendMessageStream } from "../../services/DTOs/DTOsendMessageStream";
import { IMessageStream } from "../../services/messageStream/IMessageStream";

export const RabbitMqImplementation = ( channel : Channel ) : IMessageStream =>{

    return{
        sendMessage(data : DTOSendMessageStream ) : Promise<void> {
            return new Promise((resolve, reject) =>{
                try {
                    channel.sendToQueue( data.queue, Buffer.from(data.message));
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        },
    }

}