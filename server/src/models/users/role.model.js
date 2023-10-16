const sequelize = require('../../config/dbConfig')
const { DataTypes } = require('sequelize')
const Role= sequelize.define("Role", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    role : {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
},{
    timestamps: false
})
module.exports=Role