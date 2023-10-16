const sequelize= require("../../config/dbConfig");
const {DataTypes}= require("sequelize");
const Categories= require("./categories.model");
const Products= sequelize.define("Products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:200
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
  }, {
    timestamps: true
})
Products.belongsTo(Categories,  { foreignKey: 'categoryId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Categories.hasMany(Products, { foreignKey: 'categoryId'})
module.exports = Products