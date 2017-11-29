const models = require('../models')

function get (req, res, next) {
  models.Group.findAll()
    .then(group => {
      res.status(200).json({ data: group })
    })
    .catch(next)
}

function create (req, res, next) {
  models.Group.create(req.body.group)
    .then(group => res.status(201).json({ data: group }))
    .catch(next)
}

function update (req, res, next) {
  models.Group.update(req.body.group, {
    where: {
      id: req.body.group.id
    }
  })
    .then(res.sendStatus(204))
    .catch(next)
}

function remove (req, res, next) {
}

module.exports = {
  get,
  create,
  update,
  remove
}
