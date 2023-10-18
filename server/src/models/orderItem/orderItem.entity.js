const { DataTypes } = require("sequelize")
const sequelize = require("../../config/dbConfig")
const Orders = require("../order/order.entity")
const Products = require("../products/products.model")
// const OrderItem = sequelize.define("OrderItem", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     orderId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//     },
//     productId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     timestamps: true
// })
// OrderItem.belongsTo(Orders, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" })
// Orders.hasOne(OrderItem, { foreignKey: "orderId" })
const OrderItemm = sequelize.define(
    "OrderItemm",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        productThumbnail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);
OrderItemm.belongsTo(Orders, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Orders.hasMany(OrderItemm, { foreignKey: "orderId" })
OrderItemm.belongsTo(Products, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Products.hasMany(OrderItemm, { foreignKey: "productId" })
module.exports = OrderItemm