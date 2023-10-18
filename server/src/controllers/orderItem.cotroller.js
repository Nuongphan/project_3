const orderService=require("../services/orderItem.service")
class orderItemController {
    // tạo orderItem
    async createOrderItem(req, res) {
    const userId=req.infor.id
    const orderId=req.body.orderId
    const result=await orderService.createOrderItem({userId,orderId})
    return res.status(result.status).json(result)
    }

}
module.exports= new orderItemController()