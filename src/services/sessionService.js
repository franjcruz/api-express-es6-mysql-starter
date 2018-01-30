import Boom from 'boom';
import redisClient from '../redis';
import { validateCredentials } from './userService';
import * as jwt from './jwtService';

/**
 * Login session.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export function login(email, password) {
  return validateCredentials(email, password).then(user => {
    let token = jwt.generate(user.attributes);
    redisClient.set(token.token, email, 'EX', 60 * 60 * 24);

    return token;
  });
}

/**
 * Delete saved token.
 *
 *
 * @param  {String}  token
 * @return {Promise}
 */
export function deleteToken(token) {
  return new Promise((resolve, reject) => {
    redisClient.del(token, (err, res) => {
      if (res === 1) {
        return resolve(res);
      } else {
        return reject(new Boom.notFound('Token not found'));
      }
    });
  });
}
