const Sequelize = require('sequelize')
const sequelize = require('../db').sequelize
const Group = require('./groups')

const User = sequelize.define('User', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  externalId: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING
  },
  contactNumber: {
    type: Sequelize.STRING
  },
  sex: {
    type: Sequelize.ENUM,
    values: ['m', 'f']
  },
  dob: {
    type: Sequelize.DATE
  },
  address: {
    type: Sequelize.STRING
  },
  expiryDate: {
    type: Sequelize.DATE
  },
  role: {
    defaultValue: 'member',
    type: Sequelize.ENUM,
    values: ['member', 'admin', 'superuser']
  },
  note: {
    type: Sequelize.TEXT
  }
}, {
  freezeTableName: true,
  timestamps: true
})

User.belongsTo(Group, { as: 'group', foreignKey: 'groupId' })
User.prototype.clean = function () {
  let value = this.toJSON()
  delete value['password']
  value.fullName = value.firstName + ' ' + value.lastName
  return value
}

module.exports = User
