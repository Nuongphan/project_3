const { DataTypes } = require("sequelize")
const sequelize = require("../../config/dbConfig")
const Orders = require("../order/order.entity")
const Products = require("../products/products.model")
const Carts=require("../../models/cart/cart.entity")
const OrderItemm = sequelize.define(
    "OrderItemm",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
        // price: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // },
        // productName: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        // productThumbnail: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // }
    },
    {
        timestamps: false,
    }
);
OrderItemm.belongsTo(Orders, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Orders.hasMany(OrderItemm, { foreignKey: "orderId" })
OrderItemm.belongsTo(Carts, { foreignKey: "cartId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Carts.hasMany(OrderItemm, { foreignKey: "cartId" })
Products.hasMany(OrderItemm, { foreignKey: "productId", onDelete: "CASCADE", onUpdate: "CASCADE"})
OrderItemm.belongsTo(Products, { foreignKey: "productId"})
module.exports = OrderItemm