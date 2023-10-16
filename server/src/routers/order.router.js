const express=require('express')
const orderRouter=express.Router()
const orderController=require("../controllers/order.controller")
const checkAuth=require("../middleware/checkAuth")
const checkRole=require("../middleware/checkRole")
orderRouter.post("/", checkAuth, orderController.createOrder)
module.exports=orderRouter