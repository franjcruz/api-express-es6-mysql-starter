import { Strategy, ExtractJwt } from 'passport-jwt';
import { getUser } from '../services/userService';
import logger from '../utils/logger';

const secret = process.env.JWT_ENCRYPTION;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      return getUser(jwtPayload.id)
        .then(user => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch(err => {
          logger.info(err);
          done(null, false);
        });
    })
  );
};
