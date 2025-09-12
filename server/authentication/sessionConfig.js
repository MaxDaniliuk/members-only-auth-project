require("dotenv").config();
const session = require("express-session");

const sessionConfig = session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
});

module.exports = sessionConfig;
