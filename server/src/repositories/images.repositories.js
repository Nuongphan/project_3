const Images = require("../models/images/images.entity")
const Products = require("../models/products/products.model")
class ImagesRepo {
    async addImagess(data) {
        let arrayImage = []
        for (let i = 0; i < data?.length; i++) {
            const result = await Images.create({
                imgSrc: data[i].src,
                productId: Number(data[i].productId),
            })
            arrayImage.push(result)
        }
        return arrayImage
    }
    async deleteImages(id) {
        const image = await Images.findOne({ where: { id: id } })
        return image
    }
    async getImage(id) {
        const image = await Images.findOne({ where: { id: id } })
        return image
    }
    async deleteeImage(id) {
        const result = await Images.destroy({ where: { id: id } })
        return result;
    }
    async getImages() {
        const images = await Images.findAll()
        return images
    }
    async updateImages(data) {
        const { id} = data
        const image = await Images.findAll({
            include: [{ model: Products, attributes: ['id'] }],
            where: { id: id }
        })
        return image
    }
    async updateeTmages(data) {
        const { src, id } = data
        const result = await Images.update({ imgSrc: src }, { where: { id: id } })
        return result
    }
}
module.exports = new ImagesRepo() 