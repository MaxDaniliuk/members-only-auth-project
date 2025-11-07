require("dotenv").config();
const pool = require("../db/pool");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);

const sessionConfig = session({
  store: new pgSession({
    pool: pool,
    tableName: "session",
    createTableIfMissing: true,
  }),
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
});

module.exports = sessionConfig;
