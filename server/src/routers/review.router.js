const reviewController=require("../controllers/review.controller")
const express=require("express")
const checkAuth=require("../middleware/checkAuth")
const reviewRouter=express.Router()
reviewRouter.post("/",checkAuth, reviewController.createReview)
module.exports= reviewRouter  