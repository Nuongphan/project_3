const Products = require("../models/products/products.model")
const Categories = require("../models/products/categories.model")
const Images = require("../models/images/images.entity")
const productService = require('../services/product.service')
class ProductsController {
    //Lấy toàn bộ sản phẩm 
    async getAllProducts(req, res) {
        const result = await productService.getAllProducts()
        return res.status(result.status).json(result)
    }
    //Thêm mới sản phẩm
    async addProduct(req, res) {
        console.log(req.body, '==========================');
        const { name, price, description, categoryId, stock } = req.body
        const result = await productService.addProduct({ stock,name, price, description, categoryId })
        return res.status(result.status).json(result)
    }
    //DELETE SẢN PHẨM 
    async deleteProduct(req, res) {
        const { id } = req.params
        const result = await productService.deleteProduct(id)
        return res.status(result.status).json(result)
    }
    // lấy về toàn bộ thông tin của một sản phẩm 
    async getInforProduct(req, res) {
        const { id } = req.params
        const result = await productService.getInforProduct(id)
        console.log(111111,result);
        return res.status(result.status).json(result)
    }
    // update sản phẩm 
    async updateProduct(req, res) {
        const filePath = req.file
        const { id } = req.params
        const { stock,name, price, description, categoryId, } = req.body
        const result = await productService.updateProduct({stock, filePath, name, price, description, categoryId, id })
        return res.status(result.status).json(result)
    }
}
module.exports = new ProductsController;