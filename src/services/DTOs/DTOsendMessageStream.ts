export class DTOSendMessageStream{
    constructor(
        public queue : string,
        public message : any
    ){}
}