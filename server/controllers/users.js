const models = require('../models')

function get (req, res, next) {
  models.User.findAll().then(users => {
    res.json(users)
  })
}

function create (req, res, next) {
  console.log(req)
  // models.User.create()
}

function update (req, res, next) {
}

function someShit (req, res, next) {
  // const id = parseInt(req.params.id)
  // if (id >= 0 && id < users.length) {
  //   res.json(users[id])
  // } else {
  //   res.sendStatus(404)
  // }
}

module.exports = {
  get,
  create,
  update,
  someShit
}
