const cartRepo = require("../repositories/cart.repositories")
class CartService {
    // tạo cart
    async createCart(data) {
        const { quantity, userId, productId } = data
        console.log(data);
        try {
            const product = await cartRepo.findProduct(data)
            if (!product) { return { msg: "Product not found", status: 404 } }
            const productCartUser = await cartRepo.productCartUser(data)
            if (Number(productCartUser?.dataValues?.productId) === Number(productId)) {
                const quantityProduct= Number(productCartUser?.dataValues?.quantity)+Number(quantity)
                const updateCart = await cartRepo.updateCart({ quantityProduct, userId, productId })
                return { msg: "Cart updated successfully", data: updateCart, status: 200 }
            }
            const result = await cartRepo.createCart(data)
            return { msg: "Cart created successfully", data: result, status: 200 }
        } catch (error) {
            return { msg: "Cart created failed", data: error, status: 400 }
        }

    }
    // lấy về cart của mỗi user
    async getCartByUser(userId) {
        try {
            const result = await cartRepo.getCartByUser(userId)
            return { msg: "success", data: result, status: 200 }
        } catch (error) {
            return { msg: "fail", data: error, status: 400 }
        }
    }
    // xoá sản phẩm 
    async deleteProduct(cartId) {
        try {
            const result = await cartRepo.deleteProduct(cartId)
            if (result == 0) {
                return { msg: "Cart not found", status: 404 }
            }
            return { msg: "success", data: result, status: 200 }
        } catch (error) {
            return { msg: "error", data: result, status: 400 }
        }

    }
    // thay đổi số lượng sản phẩm
    async changQuantity(data) {
        const { cartId, quantity } = data
        try {
            const cart= await cartRepo.findCart(data)
            if(!cart) {return {msg:"no cart found", status:404}}
            const result = await cartRepo.changQuantity({quantity,cartId})
            return { msg: "success", data: result, status: 200 }
        } catch (error) {
            return { msg: "fail", data: error, status: 400 }
        }
    }


}
module.exports = new CartService()