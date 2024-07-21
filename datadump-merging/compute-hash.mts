import { createReadStream, PathLike } from 'fs';
import fs from 'fs/promises';
import crypto from 'crypto';
import stream from 'stream/promises';

export async function checkFileChanged(filepath: PathLike, hashCacheFilepath: PathLike, updateCache: boolean = true) {
    if(!filepath) throw new Error('filepath must be specified');
    if(!hashCacheFilepath) throw new Error('hashCacheFilepath must be specified');
    
    // get hash from filepath
    const hashNew = await computeFileHash(filepath);

    // compare with cached
    let hashOld = null;
    if((await fs.lstat(filepath)).isFile()) {
        hashOld = await fs.readFile(hashCacheFilepath, { encoding: 'utf8' });
    }

    let isDifferent = hashNew != hashOld || hashOld == null;
    if(isDifferent && updateCache) {
        await fs.writeFile(hashCacheFilepath, hashNew);
    }
    return isDifferent;
}

// https://stackoverflow.com/a/75949050/14390381

export async function computeFileHash(filepath: PathLike, algorithm: string = 'sha256') {
    const input = createReadStream(filepath);
    const hash = crypto.createHash(algorithm);
    
    // Connect the output of the `input` stream to the input of `hash`
    // and let Node.js do the streaming
    await stream.pipeline(input, hash);
  
    return hash.digest('hex');
}