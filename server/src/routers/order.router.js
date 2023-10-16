const express=require('express')
const orderRouter=express.Router()
const orderController=require("../controllers/order.controller")
const checkAuth=require("../middleware/checkAuth")
const checkRole=require("../middleware/checkRole")  
orderRouter.post("/", checkAuth, orderController.createOrder)
orderRouter.put("/:id", checkAuth,  orderController.updateOrderStatus)
orderRouter.get("/", checkAuth,  orderController.getAllOrder)
orderRouter.put("/cancel/:idOrder", checkAuth,  orderController.cancelOrder)






module.exports=orderRouter