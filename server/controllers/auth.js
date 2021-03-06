const User = require('../models').User
const bcrypt = require('bcryptjs')

function login (req, res, next) {
  User.find({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      const authenticated = bcrypt.compareSync(req.body.password, user.password)
      if (authenticated) {
        req.session.authUser = user.clean()
        return res.json(user.clean())
      }
    }

    return res.status(401).json({ error: 'Neispravna lozinka ili korisničko ime' })
  })
}

function logout (req, res, next) {
  delete req.session.authUser
  res.status(200).json({ ok: true })
}

module.exports = {
  login,
  logout
}
