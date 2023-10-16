const orderRepo = require("../repositories/order.repositories")
class OrderService {
    // tạo mới order
    async createOrder(data) {
        try {
            const { userId, addressId, paymentId } = data
            if (!userId || !addressId || !paymentId) {
                return { msg: "invalid data", status: 404 }
            }
            const address = await orderRepo.findAddress(data)
            if (!address) {
                return { msg: "not found addressId", status: 404 }
            }
            const payment = await orderRepo.findPayment(data)
            if (!payment) {
                return { msg: "not found paymentId", status: 404 }
            }
            const cart = await orderRepo.findCartByUser(data)
            const totalAmount = await orderRepo.totalAmountInOrder(data)
            const result = await orderRepo.createOrder({ data, cart, totalAmount })
            return { msg: "success", data: result, status: 200}
        }
        catch (error) {
            return { msg: error.message, status: 500 }
        }
    }
    // cập nhật trạng thái đơn hàng 
    async updateOrderStatus(data) {
        try {
            const { orderId, status } = data
            if (!orderId ||!status) {
                return { msg: "invalid data", status: 404 }
            }
            const result = await orderRepo.updateOrderStatus(data)
            return { msg: "success", data: result, status: 200 }
        }
        catch (error) {
            return { msg: error.message, status: 500 }
        }
    }
    // lấy về tất cả order
    async getAllOrder() {
        try {
            const result = await orderRepo.getAllOrder()
            return { msg: "success", data: result, status: 200 }
        }
        catch (error) {
            return { msg: error.message, status: 500 }
        }
    }
    //người dùng huỷ đơn hàng 
    async cancelOrder(orderId) {
        try {
            const result = await orderRepo.cancelOrder(orderId)
            return { msg: "success", data: result, status: 200 }
        }
        catch (error) {
            return { msg: error.message, status: 500 }

    }

}}
module.exports = new OrderService()