const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const User = sequelize.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('online', 'offline'),
      defaultValue: 'offline',
      allowNull: false,
    },
    uid: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    avatar: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    full_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    gender: {
      type: Sequelize.DataTypes.ENUM('male', 'female', 'other'),
      allowNull: false,
    },
    birth_date: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    biography: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    match_gender: {
      type: Sequelize.DataTypes.ENUM('everyone', 'male', 'female', 'other'),
      allowNull: false,
    },
    device_brand: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_model: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    device_os_version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    app_version: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    last_active_at: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: true,
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: true,
    },
  },
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
)

module.exports = User
