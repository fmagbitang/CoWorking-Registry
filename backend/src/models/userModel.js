const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/dbConfig');
// import bcrypt
const bcrypt = require('bcrypt');

// Connect to the SQLite database
const sequelize = dbConfig.connect();

// Define the User model
const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Use auto-incrementing ID
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Add unique constraint to the email field
      validate: {
        isEmail: true, // Validate that the email is in the correct format
        isUniqueEmail: async (value) => {
          // Custom validation to check if the email is unique in the database
          const existingUser = await User.findOne({ where: { email: value } });
          if (existingUser) {
            throw new Error('Email already exists in the database.');
          }
        },
      },
    },
    email_verification: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Add unique constraint to the username field
      validate: {
        notNull: { msg: 'Username cannot be null.' },
        notEmpty: { msg: 'Username cannot be empty.' },
        isUniqueUsername: async (value) => {
          // Custom validation to check if the username is unique in the database
          const existingUser = await User.findOne({ where: { username: value } });
          if (existingUser) {
            throw new Error('Username already exists in the database.');
          }
        },
      },
    },
    mobile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type:  DataTypes.STRING,
      allowNull: false,
      defaultValue: 'coworking',
    },
    password: {
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
    tableName: 'users',
    timestamps: false, // Set to true to include timestamps
    hooks: {
      beforeCreate: async (user) => {
        // Hash the user's password before saving it to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;
      },
      // beforeUpdate: async (user) => {
      //   // Hash the user's password before saving it to the database
      //   const saltRounds = 10;
      //   const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      //   user.password = hashedPassword;
      // },
    },
  }
);

// Custom method to verify user password during login
User.prototype.verifyPassword = async function (password) {
    console.log('Provided Password:', password);
    console.log('Hashed Password from DB:', this.password);
  
    const isPasswordValid = await bcrypt.compare(password, this.password);
    console.log('Is password valid?', isPasswordValid);
  
    return isPasswordValid;
};
  

module.exports = User;
