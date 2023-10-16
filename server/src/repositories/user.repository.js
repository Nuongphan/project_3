const User = require("../models/users/users.model")
const Role = require("../models/users/role.model")
const Address = require("../models/users/address.model")
const Favorites=require("../models/favorite/favorite.entity")
const Categories=require("../models/products/categories.model")
const Images=require("../models/favorite/favorite.entity")

const Sequelize = require('sequelize');
class UserRepository {
    async login(email) {
        const user = await User.findOne({ where: { email: email } })
        return user
    }
    async register(email) {
        const roleUser = await Role.findOne({ where: { role: 1 } })
        const userr = await User.findOne({ where: { email: email } })
        return { roleUser, userr }
    }
    async regissterr(data) {
        const { fullName, avatar, newPassword, email, roleId } = data
        const newUser = await User.create({ avatar: avatar, fullName: fullName, password: newPassword, email: email, roleId: roleId })
        return newUser
    }
    async getAllUser() {
        const users = await User.findAll({
            include:[{model: Address}]
        })
        return users
    }
    async forgotPassword(email) {
        const user = await User.findOne({ where: { email: email } })
        return user
    }
    async resetPassword(email) {
        const user = await User.findOne({ where: { email: email } })
        return user
    }
    async getInforUser(id) {
        const user = await User.findOne({ where: { id: id } })
        const inforUser = await User.findAll({
            attributes: [
                'id', 'fullName', 'password', 'email', 'status', 'rank', 'avatar', 'roleId'
            ],
            include: [{ model: Address, attributes: ['id', 'address', 'phone', 'userId'] }],
            where: { id: id }
        })
        return { user, inforUser }
    }
    async deleteAddress(idUser) {
        const user = await User.findOne({ where: { id: idUser } })
        return user
    }
    async updateAddress(idUser) {
        const user = await User.findOne({ where: { id: idUser } })
        return user
    }
    async updateStatus(id) {
        const user = await User.update({ status: Sequelize.literal('CASE WHEN status = 1 THEN 2 ELSE 1 END') }, { where: { id: id } })
        return user
    }
    async resetPassword(data) {
        const { hashedPassword, email } = data;
        const newPassword = await User.update({ password: hashedPassword }, { where: { email: email } });
        return newPassword
    }
    async createAddresss(data) {
        const { address, phone, id } = data
        const newAddress = await Address.create({ address: address, phone: phone, userId: id })
        return newAddress
    }
    async deleteeAddress(id) {
        const reuslt= await Address.destroy({ where: { id: id } })
        return reuslt
    }
    async updateeAddress(data) {
        const {idAddress, address, phone}=data
        const result= await Address.update({ address: address, phone: phone }, {
            where: { id: idAddress }
        })
        return result
    }
}

module.exports = new UserRepository()