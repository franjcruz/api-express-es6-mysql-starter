import Boom from 'boom';
import jwt from 'jsonwebtoken';
import redisClient from '../redis';
import logger from '../utils/logger';

const secret = process.env.APP_SECRET;

/**
 * Refresh token.
 *
 *
 * @param  {String}  username
 * @param  {String}  refreshToken
 * @return {Promise}
 */
export function refreshToken(username, refreshToken) {
  return new Promise((resolve, reject) => {
    redisClient.get(refreshToken, (err, res) => {
      logger.log('info', res, username);
      if (res === username) {
        let user = {
          username: username,
          role: 'admin'
        };

        // let token = jwt.sign(user, secret, { expiresIn: 300 });
        let tokenRes = {
          token: jwt.sign(user, secret, { expiresIn: 300 })
        };

        return resolve(tokenRes);
      } else {
        return reject(new Boom.notFound('Token not found'));
      }
    });
  });
}

/**
 * Reject token.
 *
 *
 * @param  {String}  refreshToken
 * @return {Promise}
 */
export function rejectToken(refreshToken) {
  return new Promise((resolve, reject) => {
    redisClient.del(refreshToken, (err, res) => {
      if (res === 1) {
        return resolve(res);
      } else {
        return reject(new Boom.notFound('Token not found'));
      }
    });
  });
}
