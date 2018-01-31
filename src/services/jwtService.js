import jwt from 'jsonwebtoken';
import moment from 'moment';

const secret = process.env.JWT_ENCRYPTION;
const expi = process.env.JWT_EXPIRATION;

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
    phone: user.phone,
    iat: moment().unix(),
    exp: moment()
      .add(expi, 'seconds')
      .unix()
  };
  let token = jwt.sign(payload, secret);

  let res = {
    token: token
  };

  return res;
}

/**
 * Decode jwt.
 *
 *
 * @param  {String}  token
 * @return {Object}
 */
export function verify(token) {
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return err;
    }

    return decoded;
  });
}
