'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.hasMany(models.Order)
    }
    formatDate () {
      const newDate = new Date(this.createdAt)
      const formatted = newDate.toLocaleDateString('id-ID')
      return formatted
    }
 
  };
  Transaction.init({
    total: DataTypes.FLOAT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};