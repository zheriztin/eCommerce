'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaction)
      User.hasMany(models.Product)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email is Required'
        },
        isEmail: {
          msg: 'Please enter a valid email address'
        }
      },
      unique: {
        msg: 'Email already exists'
      }
    }, 
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [8],
          msg: 'Minimum password length is 8 characters'
        }
      }
    },
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate:  (User, options) => {
        User.password =   hashPassword(User.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};