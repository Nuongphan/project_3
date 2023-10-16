// const {DataTypes}=require("sequelize")
// const sequelize=require("../../config/dbConfig")
// const Carts=require("../cart/cart.entity")
// const Products=require("../products/products.model")
// const OrderItem=sequelize.define("OrderItemm", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false
//     },
//     cartId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     productId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }

// }, {
//     timestamps: true
// })
// OrderItem.belongsTo(Carts, { foreignKey: 'cartId', onDelete: "CASCADE", onUpdate: "CASCADE"})
// Carts.hasMany(OrderItem, {foreignKey:"cartId"})
// OrderItem.belongsTo(Products,{ foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
// Products.hasMany(OrderItem, {foreignKey:"productId"})
// module.exports=OrderItem