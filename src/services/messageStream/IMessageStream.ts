import { DTOSendMessageStream } from "../DTOs/DTOsendMessageStream";

export interface IMessageStream{
    sendMessage( data : DTOSendMessageStream ): void 
}