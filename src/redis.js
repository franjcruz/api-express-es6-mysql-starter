import redis from 'redis';
import logger from './utils/logger';

/**
 * Redis configuration.
 */
let redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

redisClient.on('error', function(err) {
  logger.log('info', 'Error ' + err);
});

export default redisClient;
