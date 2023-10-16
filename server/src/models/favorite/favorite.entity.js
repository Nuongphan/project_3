const {DataTypes}=require("sequelize")
const sequelize=require("../../config/dbConfig")
const Products=require("../products/products.model")
const Users=require("../users/users.model")
const Favorite=sequelize.define("Favorite", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
}, {
    timestamps:true
})
Favorite.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Users.hasMany(Favorite, {foreignKey:"userId"})
Favorite.belongsTo(Products,{ foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Products.hasMany(Favorite, {foreignKey:"productId"})
module.exports=Favorite