const Products = require("../models/products/products.model")
const Categories = require("../models/products/categories.model")
const productRepo = require("../repositories/product.repositories")
class ProductService {
    //Lấy toàn bộ sản phẩm 
    async getAllProducts() {
        try {
            const products = await productRepo.getAllProducts()
            return { msg: "success", products: products, status: 200 }
        } catch (error) {
            return { msg: "fail", error: error, status: 400 }
        }
    }
    //Thêm mới sản phẩm
    async addProduct(data) {
        const { name, price, description, categoryId } = data
        try {
            const newProduct= await productRepo.adddProduct({ name, price, description, categoryId })
            return { msg: "Successfully created", status: 200, return : newProduct}
        } catch (error) {
            return { msg: "fail", status: 400 }
        }
    }
    //DELETE SẢN PHẨM 
    async deleteProduct(id) {
        try {
            const result= await productRepo.deleteeProduct(id)
            return { msg: "deleted", status: 200, data: result }
        } catch (error) {
            console.log(error);
            return { msg: "fail", status: 400 }
        }
    }
    // lấy về toàn bộ thông tin của một sản phẩm 
    async getInforProduct(id) {
        try {
            const product = await productRepo.getInforProduct(id)
            return { msg: "success", product: product, status: 200 }
        } catch (error) {
            console.log("4444444444", error);
            return { msg: "fail", error: error, status: 400 }
        }
    }
    // update sản phẩm 
    async updateProduct(data) {
        const {  name, price, description, categoryId, id } = data
        const product = await productRepo.updateProduct(id)
        if (!product) {
            return { msg: "product not found", status: 404 }
        }
        try {
            const result= await updateeProduct({ name, price, description, categoryId, id })
            return { msg: "Successfully updated", status: 200, data: result }
        } catch (error) {
            console.log(error);
            return { msg: "fail", status: 400 }
        }
    }
}
module.exports = new ProductService()