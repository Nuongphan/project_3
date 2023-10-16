const Images=require("../models/images/images.entity")
const imagesService= require("../services/images.service")
class ImagesClass {
  // Tạo mới ảnh
  async addImages( req, res) {
    const data = req?.files?.map((el) => ({ src: el.path, ...req.body }));
    const result= await imagesService.addImages(data)
    return res.status(result.status).json(result)}
  // xoá ảnh
  async deleteImages( req, res) {
    const result= await imagesService.deleteImages(req.params.id)
    return res.status(result.status).json(result)}
  // update ảnh
  async updateImages( req, res) {
    const id=req.params.id
    const src= req.file.path
    const {productId}=req.body
    const result= await imagesService.updateImages({id, src, productId})
    return res.status(result.status).json(result)}
  // lấy về toàn bộ ảnh
  async getImages(req, res) {
    const result= await imagesService.getImages()
    return res.status(result.status).json(result)
  }
  // lấy về 1 ảnh 
  async getImage(req, res) {
    const result= await imagesService.getImage(req.params.id)
    return res.status(result.status).json(result)}
}
module.exports = new ImagesClass