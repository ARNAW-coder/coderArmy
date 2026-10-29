// sliding window algorithm 

import redisClient from "../config/redis.js";

const windowSize = 3600;  // total time of key to live
const maxRequest = 60;

const rateLimiterslider = async (req,res,next) =>{
    try {
        const key = `IP:${req.ip}`;
        const currentTime = Date.now()/1000;
        const windowTime = currentTime - windowSize;
    
        await redisClient.zRemRangeByScore(key,0,windowTime);
    
        const numberOfReq = await redisClient.zCard(key);
        if( numberOfReq > maxRequest){
            throw new Error("max request limit reached");
        }
    
        await redisClient.zAdd(key,[{score:currentTime, value:`${currentTime}:${Math.random()}`}])
        await redisClient.expire(key,windowSize);
        next();
    } catch (error) {
        res.send(error);
    }
}

export default rateLimiterslider;