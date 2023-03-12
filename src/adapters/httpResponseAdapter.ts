export type httpResponseAdapter = {
    send: (status? : number, body? : any ) => void
}