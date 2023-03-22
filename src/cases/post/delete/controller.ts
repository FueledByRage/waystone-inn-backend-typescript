import { errorFactory } from "../../../utils/errorFactory";
import { IDeletePost } from "./delete";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";

export function deletePostController( deletePost : IDeletePost) : IController {
    return{
        async execute(req: httpRequestAdapter){
            
            try { 
                const { id }= req.params;
                const { userId } = req.header;
            
                if(!userId) throw errorFactory('Authorization token missing.', 406);

                await deletePost.execute(id, userId.toString());

                return 204;
                //res.sendStatus(204);
                
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}