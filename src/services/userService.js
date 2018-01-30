import Boom from 'boom';
import User from '../models/user';
import * as bcrypt from 'bcryptjs';

const saltRounds = 10;

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
  return bcrypt.hash(user.password, saltRounds).then(function(hash) {
    return new User({
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: hash,
      phone: user.phone
    })
      .save()
      .then(user => user.refresh());
  });
}

/**
 * Update a user.
 *
 * @param  {Number|String}  id
 * @param  {Object}         user
 * @return {Promise}
 */
export function updateUser(id, user) {
  return bcrypt.hash(user.password, saltRounds).then(function(hash) {
    return new User({ id })
      .save({
        name: user.name,
        surname: user.surname,
        email: user.email,
        password: hash,
        phone: user.phone
      })
      .then(user => user.refresh());
  });
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
 * Validate user credentials.
 *
 * @param  {String}  email
 * @param  {String}  password
 * @return {Promise}
 */
export function validateCredentials(email, password) {
  return new User({ email }).fetch().then(user => {
    if (!user) {
      throw new Boom.notFound('User not found');
    }
    if (!bcrypt.compareSync(password, user.attributes.password)) {
      throw new Boom.notFound('Invalid credentials');
    }

    return user;
  });
}
