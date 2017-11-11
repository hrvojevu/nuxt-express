const Sequelize = require('sequelize')

const connectionString = process.env.CLEARDB_DATABASE_URL || 'mysql://root:admin@127.0.0.1/nuxt-express'

const sequelize = new Sequelize(connectionString, {
  logging: true
})

module.exports = {
  sequelize
}
