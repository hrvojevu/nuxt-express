const models = require('../models')

function clean (obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === '' || obj[key] === null) delete obj[key]
  })

  return obj
}

function get (req, res, next) {
  models.User.findAll()
    .then(users => {
      const clean = users.map(u => u.clean())
      res.status(200).json({ data: clean })
    })
    .catch(next)
}

function create (req, res, next) {
  models.User.create(clean(req.body.user))
    .then(user => res.status(201).json({ data: user }))
    .catch(next)
}

function update (req, res, next) {
  models.User.update(clean(req.body.user), {
    where: {
      id: req.body.user.id
    }
  })
    .then(res.sendStatus(204))
    .catch(next)
}

function getUser (req, res, next) {
}

module.exports = {
  get,
  create,
  update,
  getUser
}
