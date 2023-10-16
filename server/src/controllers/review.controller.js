const reviewService = require("../repositories/review.repositori")
class ReviewController {
    // tạo review 
    async createReview(req, res) {
        const idUser = req.infor.idUser
        console.log("777777777777", idUser);
         
        // try {
        //     const review = await reviewService.createReview(req.body);
        //     return res.status(201).json({
        //         message: "Review created successfully",
        //         review
        //     });
        // } catch (error) {
        //     return res.status(500).json({
        //         message: "Server error",
        //         error
        //     });
        // }
    }

}
module.exports = new ReviewController()