import express from 'express'
import { Nuxt, Builder } from 'nuxt'

import api from './api'

const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const db = require('./db')
const bodyParser = require('body-parser')
const session = require('./session')

app.set('port', port)

app.use(bodyParser.json())
app.use(session)

// Import API Routes
app.use('/api', api)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

// Give nuxt middleware to express
app.use(nuxt.render)

db.sequelize.sync({ force: true }).then(() => {
  const User = require('./models/users')
  const bcrypt = require('bcryptjs')
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync('demo', salt)
  User.create({
    externalId: '1',
    firstName: 'Demo',
    lastName: 'Demo',
    username: 'demo',
    email: 'demo@mail.com',
    password: hash,
    role: 'superuser'
  })
})
// db.sequelize.sync()

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
