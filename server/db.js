const Sequelize = require('sequelize')

const host = process.env.DB_HOST || '127.0.0.1'
const dbName = process.env.DB_NAME || 'nuxt-express'
const user = process.env.DB_USER || 'root'
const pwd = process.env.DB_USER_PWD || 'admin'

const sequelize = new Sequelize(`mysql://${user}:${pwd}@${host}/${dbName}`, {
  logging: true
})

module.exports = {
  sequelize
}
