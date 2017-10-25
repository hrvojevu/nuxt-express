const models = require('../models')

function get (req, res, next) {
  models.User.findAll()
    .then(users => {
      const clean = users.map(u => u.clean())
      res.status(200).json({ data: clean })
    })
    .catch(next)
}

function create (req, res, next) {
  models.User.create(req.body.user)
    .then(user => res.status(201).json({ data: user }))
    .catch(next)
}

function update (req, res, next) {
  models.User.update(req.body.user, {
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
