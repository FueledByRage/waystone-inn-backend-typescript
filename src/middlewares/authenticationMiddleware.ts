import { httpRequestAdapter } from "../adapters/httpRequestAdapter"
import { JWTImplementaion } from "../services/cryptography/Implementations/jsonwebtokenImplementation";

export const adaptedAuthenticationMiddleware = () =>{
    return{
        execute: async ( httpRequest : httpRequestAdapter ) =>{
            try {
                // Get the user's authentication status from the request
                const { token } = httpRequest.header;
                const cryptoImplementation = JWTImplementaion();
            
                // If the user is authenticated, allow them to continue
                if(token){
                    //Gotta decript the token
                    httpRequest.header.userId = await cryptoImplementation.decript(token.toString());
                     
                    return httpRequest;
                }
            
                return 406;
                
            } catch (error) {
                return 406;
            }
        }
    }
}