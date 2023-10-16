 const sequelize = require('../../config/dbConfig')
const { DataTypes } = require('sequelize')
const Role= require("./role.model")
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
});
User.belongsTo(Role, { foreignKey: 'roleId' });
Role.hasMany(User, { foreignKey: 'roleId'})
module.exports = User