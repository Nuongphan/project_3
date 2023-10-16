const sequelize = require("../../config/dbConfig");
const { DataTypes } = require("sequelize");
const Products = require("../products/products.model");
const Images = sequelize.define("Images", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
  
    imgSrc: {
        type: DataTypes.TEXT,
    }
})
Images.belongsTo(Products,  { foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Products.hasMany(Images, { foreignKey: 'productId'})
module.exports =Images