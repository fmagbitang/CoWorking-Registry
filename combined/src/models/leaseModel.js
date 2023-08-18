const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');

// Connect to the SQLite database
const sequelize = dbConfig.connect();

// Define the Lease model
const Lease = sequelize.define(
  'Lease',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Use auto-incrementing ID
    },
    lease_term: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0.00
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    renter_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    workspace_id: {
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
    tableName: 'lease',
    timestamps: false, // Set to true to include timestamps
  }
);

module.exports = Lease;
