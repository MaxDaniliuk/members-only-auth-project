const LocalStrategy = require("passport-local").Strategy;
const { comparePasswords } = require("./passwordController");
const prisma = require("../db/prisma");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    try {
      const user = await prisma.findUser("username", username);
      if (!user) {
        return done(null, false, {
          username: "Incorrect username. Please try again.",
        });
      }
      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return done(null, false, {
          password: "Incorrect password. Please try again.",
        });
      }
      const { user_id, ismember, isadmin } = user;
      return done(null, { user_id, ismember, isadmin });
    } catch (error) {
      error.message = "Something went wrong on the DB.";
      return done(error);
    }
  };

  passport.use(new LocalStrategy(authenticateUser));
  passport.serializeUser((user, done) => done(null, user.user_id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.findUser("user_id", id);
      const { user_id, ismember, isadmin } = user;
      done(null, { user_id, ismember, isadmin });
    } catch (error) {
      done(error);
    }
  });
}

module.exports = initialize;
