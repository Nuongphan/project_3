const express=require("express")
const productsRouter=express.Router();
const productsController=require("../controllers/products.controller")
const upload=require("../middleware/uploadImages")
const checkAuth=require("../middleware/checkAuth")
const checkRole=require("../middleware/checkRole")
productsRouter.post("/",checkAuth, checkRole,upload.array("images", 3), productsController.addProduct)
productsRouter.get("/", productsController.getAllProducts)
productsRouter.delete("/:id",checkAuth, checkRole, productsController.deleteProduct)
productsRouter.put("/:id",checkAuth, checkRole,upload.single("images"), productsController.updateProduct)
productsRouter.get("/:id", productsController.getInforProduct)
module.exports=productsRouter

