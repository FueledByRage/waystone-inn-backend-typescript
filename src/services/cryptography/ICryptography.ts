export interface ICryptography{
    encrypt(payload : string ) : string,
    decript( token : string ) : string 
}