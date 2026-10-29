// fixed window algorithm.....

import redisClient from "../config/redis.js";
const rateLimiter = async (req,res,next) =>{
        try{
            const ip = req.ip;
            const count = await redisClient.incr(ip);
            if(count > 10){
                throw new error("request limit exceeded");
            }
            if(count == 1){
                await redisClient.expire(3600);
            }

            next();
        }
        catch(error){
            console.log(error);
            res.status(500).send(error);
        }
}

export default rateLimiter;