const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
passport.serializeUser((user , done) => {
    done(null , user);
})
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy({
        clientID:"68959758834-ccds6upleh31280ndbbja403jojjv5r1.apps.googleusercontent.com", // Your Credentials here.
        clientSecret:"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", // Your Credentials here.
        callbackURL:"http://localhost:3000/auth/callback",
        passReqToCallback:true
    },
    function(request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));