const Favorites=require("../models/favorite/favorite.entity")
const favoriteRepo=require("../repositories/favorites.repositories")
class favoritesService {
    // lấy toàn bộ sản phẩm yêu thích
    async getAllFavorites( ){
        const result = await favoriteRepo.getAllFavorites()
        if(result) {
            return {msg: "success", status: 200, data:result}  
        }
      return {msg: "error", status:404}
    }
    async getUserFavorites(idUser) {
        const result = await favoriteRepo.getUserFavorites(idUser)
        if(result) {
            return {msg: "success", status: 200, data:result}  
        }
      return {msg: "error", status:404}
    }
    // Thêm sản phẩm yêu thích
    async addFavorite(data) {
        const result = await favoriteRepo.addFavorite(data)
       return result 
      
    }
    // Xoá sản phẩm yêu thích 
    async deleteFavorite(id) {
        const result = await favoriteRepo.deleteFavorite(id)
       if(result) {
        return {msg: "success", status: 200, data:result}
       }
       return {msg: "error", status:404}
    }   
}
module.exports=new favoritesService()