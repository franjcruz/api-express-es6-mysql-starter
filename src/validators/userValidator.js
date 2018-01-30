import Joi from 'joi';
import validate from '../utils/validate';
import * as userService from '../services/userService';

const SCHEMA = {
  name: Joi.string()
    .label('name')
    .max(255)
    .optional(),
  surname: Joi.string()
    .label('surname')
    .max(255)
    .optional(),
  username: Joi.string()
    .label('username')
    .max(255)
    .required(),
  password: Joi.string()
    .label('password')
    .max(255)
    .required(),
  phone: Joi.string()
    .label('phone')
    .max(15)
    .required()
};

/**
 * Validate create/update user request.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function userValidator(req, res, next) {
  return validate(req.body, SCHEMA)
    .then(() => next())
    .catch(err => next(err));
}

/**
 * Validate users existence.
 *
 * @param  {object}   req
 * @param  {object}   res
 * @param  {function} next
 * @return {Promise}
 */
function findUser(req, res, next) {
  return userService
    .getUser(req.params.id)
    .then(() => next())
    .catch(err => next(err));
}

export { findUser, userValidator };
