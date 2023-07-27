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
      allowNull: false,
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
