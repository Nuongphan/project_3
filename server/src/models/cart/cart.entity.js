const {DataTypes}=require("sequelize")
const sequelize=require("../../config/dbConfig")
const Products=require("../products/products.model")
const Users=require("../users/users.model")
const Carts=sequelize.define("Carts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    }
}, {
    timestamps:true
})
Carts.belongsTo(Users, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Users.hasOne(Carts, {foreignKey:"userId"})
Carts.belongsTo(Products,{ foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Products.hasMany(Carts, {foreignKey:"productId"})
module.exports=Carts