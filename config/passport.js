import bcryptjs from "bcryptjs";
import LocalStrategy from "passport-local";
import GoogleStrategy from "passport-google-oauth";
import FacebookStrategy from "passport-facebook";
import db from "../db.js";

export function createUser(profile) {
  const password = "secret";
  return {
    id: profile.id,
    displayName: profile.displayName,
    name: profile.name,
    photos: profile.photos || [],
    provider: profile.provider,
    secret: bcryptjs.hashSync(password, 10),
  };
}

export function configurePassport(passport) {
  const host = process.env.HOST;
  passport.use(
    new GoogleStrategy.OAuth2Strategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${host}/auth/google/callback`,
      },
      function (accessToken, refreshToken, profile, done) {
        const user = db.findIdOrCreate(profile.id, createUser(profile));
        done(null, user);
      }
    )
  );

  passport.use(
    new FacebookStrategy.Strategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: `${host}/auth/facebook/callback`,
      },
      function (accessToken, refreshToken, profile, done) {
        const user = db.findIdOrCreate(profile.id, createUser(profile));
        done(null, user);
      }
    )
  );

  passport.use(
    new LocalStrategy.Strategy(
      { usernameField: "username", passwordField: "password" },
      function (username, password, done) {
        if (!username) {
          return done(null, false);
        }
        if (!password) {
          return done(null, false);
        }
        const user = db.findIdOrCreate(-1, { id: -1, displayName: username });
        if (!bcryptjs.compareSync(password, user.secret)) {
          return done(null, false);
        }
        return done(null, user);
      }
    )
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user.id);
  });

  passport.deserializeUser(function (id, cb) {
    cb(null, db.findId(id));
  });
}

export const ensureLoggedIn = function () {
  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).end("User not logged in");
    } else {
      next();
    }
  };
};
