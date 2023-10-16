const { DataTypes } = require("sequelize")
const sequelize = require("../../config/dbConfig")
const Payment = sequelize.define("Payment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    paymentMethod: {
        type: DataTypes.TEXT,
        allowNull: false
    }    
}, {
    timestamps: true
})
module.exports = Payment