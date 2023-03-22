import fs from "fs";
import path from "path";
import { Writable, pipeline, Transform } from "stream";
import { promisify } from "util";

const pipelineAsync = promisify(pipeline);

function isJsonString( str : string) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export const exportToDatabase = async ()=>{
    const file = fs.readFileSync(path.join( __dirname, '..', 'users', 'users.json'), 'utf-8');
    let buffer : Buffer = Buffer.from('');

    const writableStream = new Writable({
        write: ( chunk, encoding, cb)=>{
            console.log('msg', chunk.toString(), encoding);

            cb();
        }
    });

    const transformStream = new Transform({
        transform(chunk, encoding, cb) {
            if(chunk.toString() == '[' || chunk.toString() == ']') return;
            //buffer = this.buffer || Buffer.from()
            buffer = Buffer.concat([ buffer, chunk ]);
            if(isJsonString(buffer.toString())) cb();
            cb();
        },
        flush(callback) {
            
        },
    })

    await pipelineAsync(
        file,
        //transformStream,
        writableStream
        //process.stdout
    )
}

exportToDatabase();