const express=require('express')
const orderRouter=express.Router()
const orderController=require("../controllers/order.controller")
const checkAuth=require("../middleware/checkAuth")
const checkRole=require("../middleware/checkRole")  
orderRouter.post("/", checkAuth, orderController.createOrder)
orderRouter.put("/:id", checkAuth,  orderController.updateOrderStatus)
orderRouter.get("/",  orderController.getAllOrder)
orderRouter.put("/cancel/:idOrder", checkAuth,  orderController.cancelOrder)
orderRouter.get("/orderuser", checkAuth,  orderController.findOrderByUser)


module.exports=orderRouter