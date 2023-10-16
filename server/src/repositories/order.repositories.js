const Order = require("../models/order/order.entity")
const Cart = require("../models/cart/cart.entity")
const Address = require("../models/users/address.model")
const Payment = require("../models/payment/payment.entity")
const Products = require("../models/products/products.model")
class OrderRepo {
    async totalAmountInOrder(data) {
        const { userId } = data
        const result = await Cart.findAll({
            attributes: ['quantity'],
            include: [{ model: Products, attributes: ["price"] }],
            where: { userId: userId }
        })
        const cartsDataValues = [];

        for (let i = 0; i < result.length; i++) {
            cartsDataValues.push(result[i].dataValues);
        }
        const totalAmount = cartsDataValues
            .map(item => item.quantity * item.Product.dataValues.price) // Tính giá tiền cho mỗi sản phẩm
            .reduce((acc, curr) => acc + curr, 0)
        return totalAmount

    }
    async findCartByUser(data) {
        const { userId } = data
        const cart = await Cart.findAll({ where: { userId: userId } })
        return cart
    }
    async findAddress(data) {
        const { addressId, userId } = data
        const address = await Address.findOne({ where: { id: addressId, userId: userId } })
        return address
    }
    async findPayment(data) {
        const { paymentId } = data
        const payment = await Payment.findOne({ where: { id: paymentId } })
        return payment
    }
    async createOrder(data) {
        const {  userId, addressId, paymentId } = data.data
        const {totalAmount}=data
        const order = await Order.create({
            totalAmount:totalAmount,
            addressId:addressId,
            paymentId:paymentId,
            userId:userId,
        })
        await Cart.destroy({where:{userId:userId}})
        return order
    }
    async updateOrderStatus(data) {
        const { orderId, status } = data
        const order = await Order.update({ status: status }, { where: { id: orderId } })
        return order
    }
    async getAllOrder() {
        const order = await Order.findAll({})
        return order
    }
    async cancelOrder(orderId) {
        const order = await Order.update({status: 5}, { where: { id: orderId } })
        return order
    }
}
module.exports = new OrderRepo()