const Users = require("../models/users/users.model")
const Products = require("../models/products/products.model")
const Cart = require("../models/cart/cart.entity")
const Images = require("../models/images/images.entity")
class CartRepo {
    async productCartUser(data) {
        const { userId, productId } = data
        const cartOfUser = await Cart.findOne({ where: { userId: userId, productId: productId } })
        return cartOfUser
    }
    async updateCart(data) {
        const { quantityProduct, userId, productId } = data
        const cart = await Cart.update(
            { quantity: quantityProduct },
            {
                where: {
                    userId: userId, 
                    productId: productId
                },
                returning: true // Tùy chọn này được sử dụng để trả về dữ liệu của hàng đã được cập nhật
            })
        return cart
    }
    async createCart(data) {
        const { quantity, userId, productId } = data
        const cart = await Cart.create({ userId: userId, productId: productId, quantity: quantity })
        return cart
    }
    async findProduct(data) {
        const { productId } = data
        const product = await Products.findOne({ where: { id: productId } })
        return product
    }
    async findUser(data) {
        const { userId } = data
        const user = await Users.findOne({ where: { id: userId } })
        return user

    }
    async getCartByUser(userId) {
        const cart = await Cart.findAll({
            include: [{model: Products, include:[{model:Images}]}], where: { userId: userId } })
        return cart
    }
    async deleteProduct(cartId) {
        const result = await Cart.destroy({ where: { id: cartId } })
        return result
    }
    async findCart(data) {
        const { cartId } = data
        const cart = await Cart.findOne({ where: { id: cartId } })
        return cart
    }
    async changQuantity(data) {
        const { cartId, quantity } = data
        const result = await Cart.update({ quantity: quantity }, { where: { id: cartId } })
        return result
    }
}
module.exports = new CartRepo()