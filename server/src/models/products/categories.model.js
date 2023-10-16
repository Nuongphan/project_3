const { DataTypes } = require('sequelize');
const sequelize = require('../../config/dbConfig');
const Categories= sequelize.define('Categories', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
},
title: {
    type: DataTypes.STRING(255),
    allowNull: true
}
})
module.exports = Categories