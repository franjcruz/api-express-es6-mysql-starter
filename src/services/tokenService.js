import Boom from 'boom';
import jwt from 'jsonwebtoken';
// import Token from '../models/token';

const secret = process.env.APP_SECRET;
// sustituir por modelo token
let refreshTokens = {};

/**
 * Refresh token.
 *
 *
 * @param  {String}  username
 * @param  {String}  refreshToken
 * @return {String}
 */
export function refreshToken(username, refreshToken) {
  if (refreshToken in refreshTokens && refreshTokens[refreshToken] === username) {
    let user = {
      username: username,
      role: 'admin'
    };

    return jwt.sign(user, secret, { expiresIn: 300 });
  } else {
    throw new Boom.notFound('Token not found');
  }
}

/**
 * Reject token.
 *
 *
 * @param  {String}  refreshToken
 * @return {Boolean}
 */
export function rejectToken(refreshToken) {
  if (refreshToken in refreshTokens) {
    delete refreshTokens[refreshToken];

    return true;
  } else {
    throw new Boom.notFound('Token not found');
  }
}
