const Favorites = require("../models/favorite/favorite.entity")
const Products = require("../models/products/products.model")
const Categories = require("../models/products/categories.model")
const Images = require("../models/images/images.entity")
const Users=require("../models/users/users.model")
class FavoriteRepo {
    // lấy về toàn bộ sản phẩm yêu thích 
    async getAllFavorites() {
        try {
            const result = await Favorites.findAll({
                include: [{
                    model: Products, attributes: ['id', 'description', 'name', 'price'], include: [{
                        model: Categories,
                        attributes: ['id', 'title'],
                    },
                    {
                        model: Images,
                        attributes: ['productId', 'imgSrc'],
                    }]
                }]
            })
            return result
        }
        catch (err) {
            return err
        }
    }
    // lấy về toàn bộ sản phẩm yêu thích của 1 user theo userId 
    async getUserFavorites(id) {
        const result = await Favorites.findAll({
            attributes:['userId', 'productId', ],
            include: [{
                model: Products, attributes:['name', 'price', 'description', 'stock', 'categoryId'], include: [
                    { model: Images, attributes:['imgSrc'] },
                    { model: Categories, attributes:['title']}]
            }],
            where: { userId: id }
        })
        return result
    }
    // thêm sản phẩm yêu thích
    async addFavorite(data) {
        const { idUser, productId } = data
        const favorite = await Favorites.findOne({ where: { productId: productId }, include: [
            {
              model: Users,
              where: {
                id: idUser
              }
            }
          ] })
        if (favorite) {
            return { result: favorite, status: 409, msg: "product already" }
        }
        try {
            const result = await Favorites.create({ userId: idUser, productId: productId })
            return { result: result, msg: "success", status: 200 }
        } catch (err) {
            return { result: err, msg: "error", status: 400 }
        }
    }
    // xoá sản phẩm yêu thích
    async deleteFavorite(id) {
        try {
            const result = await Favorites.destroy({ where: { id: id } })
            return result
        } catch (err) {
            return err
        }
    }
}
module.exports = new FavoriteRepo()