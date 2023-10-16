const express=require("express")
const cartRouter=express.Router();
const cartController=require("../controllers/cart.controller")  
const checkAuth=require("../middleware/checkAuth")
cartRouter.post("/",checkAuth,cartController.createCart)
cartRouter.get("/",checkAuth,cartController.getCartByUser)
cartRouter.delete("/:id",checkAuth,cartController.deleteProduct)
cartRouter.put("/:id",checkAuth,cartController.changQuantity)
module.exports= cartRouter