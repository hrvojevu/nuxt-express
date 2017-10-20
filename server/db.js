const Sequelize = require('sequelize')

const sequelize = new Sequelize('mysql://root:admin@127.0.0.1/nuxt-express', {
  logging: true
})

module.exports = {
  sequelize
}
