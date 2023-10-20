const orderRepo = require("../repositories/order.repositories")
class OrderService {
    // tạo mới order
    async createOrder(data) {
        try {
            let { userId, addressId } = data
            if (!userId || !addressId) {
                return { msg: "invalid data", status: 404 }
            }
            let address = await orderRepo.findAddress(data)
            if (!address) {
                return { msg: "not found addressId", status: 404 }
            }
            let cart = await orderRepo.findCartByUser(data)
            if (cart?.length === 0) {
                return { msg: "cart empty", status: 404 }
            }
          let cartsDataValues = [];

            for (let i = 0; i < cart.length; i++) {
                cartsDataValues.push(cart[i].dataValues);
            }
            console.log(cartsDataValues);
            let totalquantity = cartsDataValues
                .map(item => item.quantity) // Tính giá tiền cho mỗi sản phẩm
                .reduce((acc, curr) => acc + curr, 0)
            let totalAmount = await orderRepo.totalAmountInOrder(data)
            if (totalquantity < 3) {
                const result = await orderRepo.createOrder({ data, cart, totalAmount })
                return { msg: "success", data: result, status: 200 }
            } else if (totalquantity >= 3) {
                totalAmount = Number(totalAmount * 0.85)
                const result = await orderRepo.createOrder({ data, cart, totalAmount })
                return { msg: "success", data: result, status: 200 }
            }

        }
        catch (error) {
            console.log("error", error);
            return { msg: error.message, status: 500 }
        }
    }
    // cập nhật trạng thái đơn hàng 
    async updateOrderStatus(data) {
        try {
            const { orderId, status } = data
            if (!orderId || !status) {
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
    // get order by user
    async findOrderByUser(userId) {
        try {
            const result = await orderRepo.findOrderByUser(userId)
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

    }
}
module.exports = new OrderService()