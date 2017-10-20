const sequelize = require('./db').sequelize
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

module.exports = session({
  secret: 'super-secret-key',
  store: new SequelizeStore({
    db: sequelize
  }),
  resave: false,
  saveUninitialized: false,
  proxy: true
})
