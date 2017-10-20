const Sequelize = require('sequelize')
const sequelize = require('../db').sequelize
const User = require('./users')

const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: true
})

Post.belongsTo(User, { as: 'author', foreignKey: 'userId' })

module.exports = Post
