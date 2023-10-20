const Products = require("../models/products/products.model")
const Categories = require("../models/products/categories.model")
const Images = require("../models/images/images.entity")
class ProductRepository {
    async getAllProducts() {
        const products = await Products.findAll({
            include: [
                { model: Images, attributes: ['imgSrc', 'productId'] },
                { model: Categories, attributes: ['title', 'id'] }]
        })
        return products
    }

    async getInforProduct(id) {
        const product = await Products.findAll({
            include: [
                {
                    model: Categories,
                },
                {
                    model: Images,
                },
            ],
            where: { id }
        })
        return product
    }
    async updateProduct(id) {
        const product = await Products.findOne({ where: { id: id } })
        return product
    }
    async deleteeProduct(id) {
        const result = await Products.destroy({
            where: { id: id }
        })
        return result
    }
    async adddProduct(data) {
        const {stock, name, price, description, categoryId } = data
        const newProduct = await Products.create({
            name: name,
            price: price,
            description: description,
            categoryId: categoryId,
            stock: stock
        })
        return newProduct
    }
    async updateeProduct(data) {
        const { stock,name, price, description, categoryId, id } = data
        const product = await Products.update({
            name: name,
            price: price,
            description: description,
            categoryId: categoryId,
            stock: stock
        }, { where: { id: id } })
        return product
    }

}
module.exports = new ProductRepository()