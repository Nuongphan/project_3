const Products = require("../models/products/products.model")
const Orders = require("../models/order/order.entity")
const Carts = require("../models/cart/cart.entity")
const OrderItems = require("../models/orderItem/orderItem.entity")
class OrderItemRepo {
    async findProduct(data) {
        const { userId } = data
        const result = await Orders.findAll({
        where: { userId: userId }});
          const result2 = await Carts.findAll({
            where: { userId: userId } });    
        return {orders:result,carts:result2}
    }
}
module.exports = new OrderItemRepo()