const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const unauthenticatedError = {
  error: {
    status: 401,
    message: "Unauthorized: Please Login to access the contents of this page"
  }
}

const passportInitialization = () => {
  passport.use(new GoogleStrategy({
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleSecretClientID,
      callbackURL: "http://localhost:4000/auth/google/callback",
      passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
      done(null, profile)
  }
  ))
  
  passport.serializeUser(function(user, done) {
      done(null, user);
  });
    
    passport.deserializeUser(function(user, done) {
      done(null, user);
  });
};

const prepareAuthorization = (req, res, next) => {
  passportInitialization()
  next()   
};

const isAuthenticated = (req, res, next) => {
  if(!req.isAuthenticated()) res.json(unauthenticatedError);
  next();
}








module.exports = { isAuthenticated, prepareAuthorization };
