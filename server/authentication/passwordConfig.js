const LocalStrategy = require("passport-local").Strategy;
const { comaprePasswords } = require("./passwordController");
const db = require("../db/queries");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await db.selectExistingUser("username", username);
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const isMatch = await comaprePasswords(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: "Incorrect password" });
      }
      const { user_id, ismember, isadmin } = user;
      return done(null, { user_id, ismember, isadmin });
    } catch (error) {
      return done(error);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.user_id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.selectExistingUser("user_id", id);
      const { user_id, ismember, isadmin } = user;
      done(null, { user_id, ismember, isadmin });
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
