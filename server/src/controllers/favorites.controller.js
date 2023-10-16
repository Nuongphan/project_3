const Favorites=require("../models/favorite/favorite.entity")
const favoritesService = require("../services/favorite.service")
class favoritesController {
    // lấy toàn bộ sản phẩm yêu thích
    async getFavorites(req, res) {
        const result = await favoritesService.getAllFavorites()
        return res.status(result.status).json(result)
    }
    // lấy về ản phẩm yêu thích của 1 user
    async getUserFavorites(req, res) {
        const idUser= req.infor.id
        const result = await favoritesService.getUserFavorites(idUser)
        return res.status(result.status).json(result)
    }
    // thêm sản phẩm yêu thích 
    async addFavorite(req, res) {
        const idUser= req.infor.id
        const result = await favoritesService.addFavorite({...req.body, idUser})
        return res.status(result.status).json(result)
    }
    // xoá sản phẩm yêu thích
    async deleteFavorite(req, res) {
        const result = await favoritesService.deleteFavorite(req.params.id)
        return res.status(result.status).json(result)
    }
}
module.exports = new favoritesController()