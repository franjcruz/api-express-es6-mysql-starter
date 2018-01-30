import jwt from 'jsonwebtoken';
// import randtoken from 'rand-token';
import logger from '../utils/logger';

const secret = process.env.APP_SECRET;

/**
 * Generate a new JWT.
 *
 *
 * @param  {Object}  user
 * @return {Object}
 */
export function generate(user) {
  let payload = {
    id: user.id,
    email: user.email,
    phone: user.phone
  };
  let token = jwt.sign(payload, secret, { expiresIn: 300 });
  // let refreshToken = randtoken.uid(256);

  let res = {
    token: token
    // refreshToken: refreshToken
  };

  return res;
}

// /**
//  * Refresh token jwt.
//  *
//  *
//  * @param  {Object}  user
//  * @return {Object}
//  */
// export function refresh(user) {
//   let payload = {
//     id: user.id,
//     email: user.email,
//     phone: user.phone
//   };
//   let refresh = {
//     token: jwt.sign(payload, secret, { expiresIn: 300 })
//   };

//   return refresh;
// }

/**
 * Decode jwt.
 *
 *
 * @param  {String}  token
 * @return {Object}
 */
export function decode(token) {
  jwt.verify(token, secret, (err, decoded) => {
    logger.log('info', 'Decoded', decoded);

    return decoded;
  });
}
