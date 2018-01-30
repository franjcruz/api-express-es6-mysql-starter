import jwt from 'jsonwebtoken';
import moment from 'moment';
// import randtoken from 'rand-token';

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
    phone: user.phone,
    iat: moment().unix(),
    exp: moment()
      .add(1, 'days')
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
