const orderService = require("../services/order.service")
class OrderController {
    async createOrder(req, res) {
        const result = await orderService.createOrder()
        return res.status(result.status).json(result)
    }
}
module.exports = new OrderController()