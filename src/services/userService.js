import Boom from 'boom';
import User from '../models/user';
// import Token from '../models/token';
import jwt from 'jsonwebtoken';
import randtoken from 'rand-token';

const secret = process.env.APP_SECRET;
// sustituir por modelo token
let refreshTokens = {};

/**
 * Get all users.
 *
 * @return {Promise}
 */
export function getAllUsers() {
  return User.fetchAll();
}

/**
 * Get a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function getUser(id) {
  return new User({ id }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }

    return user;
  });
}

/**
 * Create new user.
 *
 * @param  {Object}  user
 * @return {Promise}
 */
export function createUser(user) {
  return new User({ name: user.name }).save().then(user => user.refresh());
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return new User({ id }).save({ name: user.name }).then(user => user.refresh());
}

/**
 * Delete a user.
 *
 * @param  {Number|String}  id
 * @return {Promise}
 */
export function deleteUser(id) {
  return new User({ id }).fetch().then(user => user.destroy());
}

/**
 * Login user.
 *
 * @param  {String}  username
 * @param  {String}  password
 * @return {String}
 */
export function login(username, password) {
  let user = {
    username: username,
    password: password, // Remove
    role: 'admin'
  };

  let token = jwt.sign(user, secret, { expiresIn: 300 });
  let refreshToken = randtoken.uid(256);
  refreshTokens[refreshToken] = username;

  let res = {
    token: token,
    refreshToken: refreshToken
  };

  return res;
}
