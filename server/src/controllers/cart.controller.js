const cartService = require("../services/cart.sevice")
class CartController {
    // tạo cart mới
    async createCart(req, res) {
        const userId = req.infor.id
        const quantity=req.body.quantity
        const productId = req.body.productId
        const result = await cartService.createCart({quantity, userId, productId })
        return res.status(result.status).json(result)
    }
    // lấy về cart cảu mỗi user
    async getCartByUser(req, res) {
        const userId = req.infor.id
        const result = await cartService.getCartByUser(userId)
        return res.status(result.status).json(result)
    }
    //xoá sản phẩm 
    async deleteProduct(req, res) {
        const cartId= req.params.id
        const result = await cartService.deleteProduct(cartId)
        return res.status(result.status).json(result)
    }
    // thay đổi số lượng sản phẩm 
    async changQuantity(req, res) {
        const cartId = req.params.id
        const quantity = req.body.quantity
        const result = await cartService.changQuantity({ cartId, quantity })
        return res.status(result.status).json(result)
    }
}
module.exports = new CartController()  