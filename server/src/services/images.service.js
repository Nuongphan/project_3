const Images = require("../models/images/images.entity")
const ImageRepo = require("../repositories/images.repositories")
class ImagesSevice {
    // Thêm ảnh 
    async addImages(data) {
        try {
              const result=   await  ImageRepo.addImagess(data)
            return { msg: "success", status: 200, data: result }
        } catch (error) {
            return { msg: "fail, not idproduct in product table", error: error, status: 400 }
        }
    } 
    // Xóa ảnh
    async deleteImages(data) {
        try {
            const image = await ImageRepo.deleteImages(data);
            if (!image) {
                return { msg: "image not found", error: error, status: 404 }
            }
            const result= await ImageRepo.deleteeImage(data) 
            return { msg: "success", status: 200 , data: result}

        } catch (error) {
            return { msg: "fail", error: error, status: 400 }
        }

    }
    // lấy về 1 ảnh 
    async getImage(data) {
        try {
            const image = await ImageRepo.getImage(data);
            if (!image) {
                return { msg: "image not found", error: error, status: 404 }
            }
            return { msg: "success", image: image, status: 200 }
        } catch (error) {
            return { msg: "fail", error: error, status: 400 }
        }
    }
    // lấy về toàn bộ ảnh 
    async getImages() {
        try {
            const images = await ImageRepo.getImages();
            return { msg: "success", images: images, status: 200 }
        } catch (error) {
            return { msg: "fail", error: error, status: 400 }
        }
    }
    //update ảnh 
    async updateImages(data) {
        const { id, productId, src } = data
        const image = await ImageRepo.updateImages({ id, productId });
        if (!image) {
            return { msg: "image not found", error: error, status: 404 }
        }
        try {
            const result= await ImageRepo.updateeTmages({src, id})
            return { msg: "success", image: image, status: 200, data: result }
        }
        catch (error) {
            return { msg: "fail", error: error, status: 400 }
        }

    }
}
module.exports = new ImagesSevice()