import { DTOSendMessageStream } from "../../services/DTOs/DTOsendMessageStream";
import { IMessageStream } from "../../services/messageStream/IMessageStream";

export const RabbitMqImplementation = (  ) : IMessageStream =>{

    return{
        sendMessage(data : DTOSendMessageStream ) : Promise<void> {
            return new Promise((resolve, reject) =>{
                
            });
        },
    }

}