export interface ICryptography{
    encrypt( data : Object ) : Promise<string>,
    decrypt( data : string ) : Promise<string>
}