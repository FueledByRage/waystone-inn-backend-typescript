import { IFindCommunityPost } from "./find";
import { DTOGetPosts } from "../../../entities/DTOs/DTOGetPosts";
import { httpRequestAdapter } from "../../../adapters/httpRequestAdapter";

export function findCommunityPosts(find: IFindCommunityPost){

    return{
        async execute(req: httpRequestAdapter){
            try {
                const { id, page, registers } = req.params;
                const { token } = req.header;

                const data = new DTOGetPosts(id, parseInt(page), parseInt(registers))

                const response = await find.execute(data, token?.toString() || '');
                
                return { data: response };
            } catch (error) {
                return error;
            }
        }
    }
}