const express=require("express")
const orderItemRouter=express.Router()
const checkAuth=require("../middleware/checkAuth")
const orderItemController=require("../controllers/orderItem.cotroller")
orderItemRouter.post("/",checkAuth,orderItemController.createOrderItem)
module.exports=orderItemRouter