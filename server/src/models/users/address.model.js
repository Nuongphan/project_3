const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig');
const User = require('./users.model');

const Address = sequelize.define('Address', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  phone: {
    type: DataTypes.STRING(55),
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }, 
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
    timestamps: true
});
Address.belongsTo(User, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE"});
User.hasMany(Address, { foreignKey: 'userId'})


module.exports = Address;