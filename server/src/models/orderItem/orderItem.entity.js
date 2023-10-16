// const { DataTypes } = require("sequelize")
// const sequelize = require("../../config/dbConfig")
// const Orders = require("../order/order.entity")
// const OrderItem = sequelize.define("OrderItem", {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//         unique: true
//     },
//     productId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     timestamps: true
// })
// OrderItem.belongsTo(Orders, { foreignKey: "orderId", onDelete: "CASCADE", onUpdate: "CASCADE" })
// Orders.hasMany(OrderItem, { foreignKey: "orderId" })
// module.exports = OrderItem