import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const redis = async () => {
    try {
      await client.connect();
      logger.info('Connected to the Redis.');
    } catch (error) {
      logger.error('Could not connect to the Redis.', error);
    }
};
  
export default redis;
