import { Strategy, ExtractJwt } from 'passport-jwt';

const secret = process.env.APP_SECRET;

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  let opts = {};

  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;

  passport.use(
    new Strategy(opts, function(jwtPayload, done) {
      let expirationDate = new Date(jwtPayload.exp * 1000);
      if (expirationDate < new Date()) {
        return done(null, false);
      }
      let user = jwtPayload;
      done(null, user);
    })
  );
};
