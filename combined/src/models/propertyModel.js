const { Sequelize, DataTypes, Op } = require('sequelize');
const dbConfig = require('../config/dbConfig');

// Connect to the SQLite database
const sequelize = dbConfig.connect();

// Define the Property model
const Property = sequelize.define(
  'Property',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Use auto-incrementing ID
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    neighborhood: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    squarefoot: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    parking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    transportation: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    smoking: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    tableName: 'property',
    timestamps: false, // Set to true to include timestamps
  }
);

module.exports = Property;
