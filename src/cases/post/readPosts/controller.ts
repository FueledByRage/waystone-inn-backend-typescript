import { IReadPosts } from "./get";
import { errorFactory } from "../../../utils/errorFactory";
import { DTOPostByCommunity } from "../../../entities/DTOs/DTOPostByCommunity";
import { IController } from "../../../adapters/adaptersImplementations/adaptRouter";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export function readPostsController(readPosts: IReadPosts) : IController {
    return{
        async execute(req: httpRequestAdapter){
            try {
                const { id, page, registers } = req.params;
                const { userId } = req.header;
                
                if(!userId) throw errorFactory('Missing authorization token.', 406);

                const data = new DTOPostByCommunity(userId.toString() , id, parseInt(page), parseInt(registers));
                
                const response = await readPosts.execute(data);
                return { data: response };
            } catch (error) {
                return error;
            }
        }
    }
}