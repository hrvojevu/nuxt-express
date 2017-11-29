const Sequelize = require('sequelize')
const sequelize = require('../db').sequelize

const Group = sequelize.define('Group', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: true
})

module.exports = Group
