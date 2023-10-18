const userRouter=require("./user.router")
const imagesRouter=require("./image.router")
const productsRouter=require("./products.router")
const favoritesRouter=require("./favorite.router")
const reviewsRouter=require("./review.router")
const cartRouter=require("./cart.router")
const orderRouter=require("./order.router")
const orderItem=require("./orderItem.router")
function Router(app) {
    app.use("/user", userRouter)
    app.use("/images", imagesRouter)
    app.use("/products", productsRouter)
    app.use("/favorites", favoritesRouter)
    app.use("/reviews", favoritesRouter)
    app.use("/cart", cartRouter)
    app.use("/orders", orderRouter)
    app.use("/orderItem", orderItem)

}
module.exports = Router