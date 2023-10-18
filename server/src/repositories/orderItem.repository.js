const Products = require("../models/products/products.model")
const Orders = require("../models/order/order.entity")
const Carts = require("../models/cart/cart.entity")
const OrderItems = require("../models/orderItem/orderItem.entity")
class OrderItemRepo {
    async findProduct(data) {
        const { userId } = data
        console.log("76543212", userId);
        const result = await Orders.findAll({
            where: { userId: userId },
            include: [{
              model: Carts,
            }]
          });
        // const result = await Carts.findAll({
        //     where: {userId: userId},
        //     include: [{
        //         model: Orders
        //     }]
        // });
        console.log("00000000000000000000", result);
        return result
    }
}
module.exports = new OrderItemRepo()