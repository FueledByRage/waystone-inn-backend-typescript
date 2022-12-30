import { Schema, model } from "mongoose";
import { Sub } from "../entities/sub";

const subSchema = new Schema({
    userId :{ 
        required: true, 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    communityId : { 
        required: true, 
        type: Schema.Types.ObjectId,
        ref: 'Community'
    },
    adm :{
        default: false,
        type: Boolean
    },
    subAt: {
        type: Date,
        default: Date.now()
    }
});

export const SubModel = model<Sub>('Sub', subSchema);