import { Request, Response, NextFunction } from 'express';
import { JWTImplementaion } from '../services/cryptography/Implementations/jsonwebtokenImplementation';

// A middleware function that checks if the user is authenticated
async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        // Get the user's authentication status from the request
        const { token } = req.headers;
        const cryptoImplementation = JWTImplementaion();
    
        // If the user is authenticated, allow them to continue
        if(token){
            //Gotta decript the token
            req.headers.userId = await cryptoImplementation.decript(token.toString()); 
            return next();
        }
    
        return res.sendStatus(406);
        
    } catch (error) {
        res.status(406).send('An error has ocrrurried with the authentication');
    }
}

export { authMiddleware };