export interface ICryptography{
    encrypt(data : Object ) : Promise<string>,
    decript( token : string ) : Promise<string>
}