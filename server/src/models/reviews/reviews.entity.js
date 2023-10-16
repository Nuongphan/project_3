const { DataTypes } = require("sequelize")
const sequelize = require("../../config/dbConfig")
const Users=require("../users/users.model")
const Products=require("../products/products.model")
const Review = sequelize.define("Reviews", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ratting: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5
    }
}, { timestamps: true })
Review.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Users.hasOne(Review, {foreignKey:"userId"})
Review.belongsTo(Products,{ foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Products.hasMany(Review, {foreignKey:"productId"})
module.exports=Review   