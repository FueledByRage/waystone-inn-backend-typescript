export class DTOSendMessageStream{
    constructor(
        public message : string,
        public queue : string,
    ){}
}