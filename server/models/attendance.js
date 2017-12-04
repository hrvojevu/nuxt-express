const Sequelize = require('sequelize')
const sequelize = require('../db').sequelize
const User = require('./users')

const Attendance = sequelize.define('Attendance', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  }
}, {
  freezeTableName: true,
  timestamps: true
})

Attendance.belongsTo(User, { as: 'user', foreignKey: 'userId' })

module.exports = Attendance
