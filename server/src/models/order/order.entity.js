const { DataTypes } = require("sequelize")
const sequelize = require("../../config/dbConfig")
const OrderItem = require("../orderItem/orderItem.entity")
const Address = require("../users/address.model")
const Payment = require("../payment/payment.entity")
const Carts = require("../cart/cart.entity")
const Order = sequelize.define("Order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
    },
    userId: {
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
        allowNull: true
    },
    shippingFee: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 25000
    },
    orderDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date()
    },
    
}, {
    timestamps: true
})
// Order.belongsTo(Carts, { foreignKey: 'userId', onDelete: "CASCADE", onUpdate: "CASCADE" })
// Carts.hasMany(Order, { foreignKey: "userId" })
Order.belongsTo(Address, { foreignKey: "addressId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Address.hasMany(Order, { foreignKey: "addressId" })
Order.belongsTo(Payment, { foreignKey: "paymentId", onDelete: "CASCADE", onUpdate: "CASCADE" })
Payment.hasMany(Order, { foreignKey: "paymentId" })

module.exports = Order