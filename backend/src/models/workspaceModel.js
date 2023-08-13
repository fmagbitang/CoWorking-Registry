const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

// Connect to the SQLite database
const sequelize = dbConfig.connect();

// Define the Workspace model
const Workspace = sequelize.define(
  'Workspace',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Use auto-incrementing ID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capacity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ratings: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 5,
    },
    created_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'workspace',
    timestamps: false, // Set to true to include timestamps
  }
);

module.exports = Workspace;
