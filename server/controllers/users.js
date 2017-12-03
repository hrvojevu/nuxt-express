const User = require('../models').User
const bcrypt = require('bcryptjs')

function clean (obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === '' || obj[key] === null) delete obj[key]
  })

  return obj
}

function generatePwd (plaintext) {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(plaintext, salt)
}

function get (req, res, next) {
  User.findAll()
    .then(users => {
      const clean = users.map(u => u.clean())
      res.status(200).json({ data: clean })
    })
    .catch(next)
}

function create (req, res, next) {
  const user = clean(req.body.user)
  if (user.password) {
    user.password = generatePwd(user.password)
  }
  User.create(user)
    .then(user => res.status(201).json({ data: user.clean() }))
    .catch(next)
}

function update (req, res, next) {
  const user = clean(req.body.user)
  if (user.password) {
    user.password = generatePwd(user.password)
  }
  User.update(clean(user), {
    where: { id: user.id }
  })
    .then(() => {
      delete user['password']
      if (req.session.authUser.id === user.id) {
        req.session.authUser = user
      }
      res.sendStatus(204)
    })
    .catch(next)
}

module.exports = {
  get,
  create,
  update,
  clean
}
