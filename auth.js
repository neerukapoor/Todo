var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport');
const todoSchema = require("./models/todoModel");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4600/auth/google/callback",
    passReqToCallback   : true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    await todoSchema.create({ userId: profile.id,
                              userName: profile.displayName,
                              todos: ["playing", "laughing"],
                              emailId: profile.email }
    );
    console.log(profile);
    return done(null,profile);
  }
));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser(async (id, done) => {
    try {
      const user = await todoSchema.findOne({userId: id});

      if(!user) {
        return done(new Error("User not found"), null);
      }

      done(null, user);
    } catch (e) {
      done(err, null);
    }
})