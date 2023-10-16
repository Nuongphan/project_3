const {DataTypes}=require("sequelize")
const sequelize=require("../../config/dbConfig")
const OrderItem=require("../orderItem/orderItem.entity")
const Address=require("../users/address.model")
const Payment=require("../payment/payment.entity")
const Order=sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true
    },
    orderItemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    addressId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    paymentId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    }
}, {
    timestamps: true
})
Order.belongsTo(Carts, { foreignKey: 'cartId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Carts.hasMany(Order, {foreignKey:"cartId"})
Order.belongsTo(Products,{ foreignKey: 'productId', onDelete: "CASCADE", onUpdate: "CASCADE"})
Products.hasMany(Order, {foreignKey:"productId"})
module.exports=Order