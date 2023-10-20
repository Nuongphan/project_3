const Order = require("../models/order/order.entity")
const Cart = require("../models/cart/cart.entity")
const Address = require("../models/users/address.model")
const Payment = require("../models/payment/payment.entity")
const Products = require("../models/products/products.model")
const OrderItem = require("../models/orderItem/orderItem.entity")
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
    async quantityCart(data) {
        const { userId } = data
        const result = await Cart.findAll({
            where: { userId: userId }
        })
        console.log("9999999999999", result);

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
    async findOrderByUser(userId) {
        const order = await Order.findAll({ where: { userId: userId } })
        return order
    }
    async createOrder(data) {
        const { userId, addressId } = data.data
        const { totalAmount } = data
        const productsInCart = await Cart.findAll({
            where: { userId: userId },
        })
        for (let i = 0; i < productsInCart.length; i++) {
            const productInCart = productsInCart[i];
            const productId = productInCart.dataValues.productId;
            const quantityInCart = productInCart.dataValues.stock;
            console.log("quantityInCart: " , quantityInCart);
            // Kiểm tra số lượng sản phẩm trong kho
            const productInStock = await Products.findByPk(productId);
            console.log("productInStock: ", productInStock);
            if (!productInStock || productInStock.stock < quantityInCart) {
                return ({ msg: 'Sản phẩm không đủ trong kho' });
            }
            // Giảm số lượng sản phẩm trong kho
            await Products.update(
                { quantity: productInStock.quantity - quantityInCart },
                { where: { id: productId } });
        }
        const order = await Order.create({
            totalAmount: totalAmount,
            addressId: addressId,
            paymentId: 1,
            userId: userId,
        })
        for (let i = 0; i < productsInCart?.length; i++) {
            const createOrderItem = await OrderItem.create({
                cartId: productsInCart[i].dataValues.id,
                orderId: order.dataValues.id,
                productId: productsInCart[i].dataValues.productId,
                quantity: productsInCart[i].dataValues.quantity
            });
        }
        Cart.destroy({
            where: { userId: userId },
        });
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
        const order = await Order.update({ status: 5 }, { where: { id: orderId } })
        return order
    }
}
module.exports = new OrderRepo()