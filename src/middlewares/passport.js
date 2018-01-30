import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

const secret = process.env.APP_SECRET;

// Setup work and export for the JWT passport strategy
module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.use(
    new Strategy(opts, function(jwtPayload, done) {
      let userId = jwtPayload.id;

      return new User({ userId }).fetch().then((err, user) => {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
