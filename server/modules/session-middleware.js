const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./pool'); // this path is correct based on your layout
const warnings = require('../constants/warnings');

const serverSessionSecret = () => {
  if (
    !process.env.SERVER_SESSION_SECRET ||
    process.env.SERVER_SESSION_SECRET.length < 8 ||
    process.env.SERVER_SESSION_SECRET === warnings.exampleBadSecret
  ) {
    console.log(warnings.badSecret);
  }

  return process.env.SERVER_SESSION_SECRET;
};

module.exports = session({
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: serverSessionSecret() || 'keyboard_cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    secure: false,
    sameSite: 'lax'
  }
});