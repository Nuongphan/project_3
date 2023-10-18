const express=require("express")
const imagesRouter=express.Router();
const imagesController=require("../controllers/images.controller")
const uploadCloud=require("../middleware/uploadImages")
const checkAuth=require("../middleware/checkAuth")
const checkRole=require("../middleware/checkRole")
imagesRouter.post("/",checkAuth,checkRole,uploadCloud.array("images",3),imagesController.addImages)
imagesRouter.delete("/:id",checkAuth,checkRole,imagesController.deleteImages)
imagesRouter.get("/:id",imagesController.getImage)
imagesRouter.get("/",imagesController.getImages)
imagesRouter.put("/:id",checkAuth,checkRole,uploadCloud.single("image"),imagesController.updateImages)
module.exports=imagesRouter