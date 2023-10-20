const orderService = require("../services/order.service")
class OrderController {
    //tạo order mới 
    async createOrder(req, res) {
        const userId=req.infor.id;
        const addressId=req.body.addressId;
        const result = await orderService.createOrder({userId,addressId})
        return res.status(result.status).json(result)
    }
    //cập nhật status cho order có 5 trạng thái:
    // 1: Pending, 
    // 2: Processing, 
    // 3: Shipping, 
    // 4: Completed, 
    // 5: Cancelled
    async updateOrderStatus(req, res) {
        const orderId=req.params.id;
        const status=req.body.status;
        const result = await orderService.updateOrderStatus({orderId,status})
        return res.status(result.status).json(result)
    }
    // lấy về tất cả order
    async getAllOrder(req, res) {
        const result = await orderService.getAllOrder()
        return res.status(result.status).json(result)
    }
    // Người dùng huỷ đơn hàng 
    // trạng thái đơn hàng bi huỷ :5
    async cancelOrder(req, res) {
        const orderId=req.params.idOrder;
        const result = await orderService.cancelOrder(orderId)
        return res.status(result.status).json(result)
    }
    // get order by user
    async findOrderByUser(req, res) {
        const userId=req.infor.id;
        const result = await orderService.findOrderByUser(userId)
        return res.status(result.status).json(result)
    }
    
}
module.exports = new OrderController()     