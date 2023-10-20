const orderItemRepo = require("../repositories/orderItem.repository")
class OrderItemService {
    async createOrderItem(data) {
        try {
            const { userId, OrderId } = data
            const productInfor= await orderItemRepo.findProduct({ userId, OrderId })
            console.log("=======", productInfor);
            // const result = await orderItemRepo.createOrderItem({ userId, OrderId })
            return { msg: "created order item", data: productInfor, status: 200 }
        } catch (error) {
            return { msg: "error creating order item", status: 400, data: error }
        }
    }
}
module.exports = new OrderItemService()