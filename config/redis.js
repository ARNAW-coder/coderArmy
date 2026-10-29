import { createClient } from 'redis';

const redisClient = createClient({
    username: 'default',
    password: 'oRetb18isLcAwtJkd9AHZabeBzoD8hV8',
    socket: {
        host: 'ultraquiet-popcorn-icing-57443.db.redis.io',
        port: 13391
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export default redisClient;






