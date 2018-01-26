import './env';
import redis from 'redis';
import logger from './utils/logger';

/**
 * Redis configuration.
 */
let redisClient = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });
redisClient.on('connect', function() {
  logger.log('info', 'Connected to Redis Server');
});

export default redisClient;
