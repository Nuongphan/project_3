const express = require('express')
require("dotenv").config()
const app = express()
const port = process.env.SERVER_PORT
const sequelize = require("./src/config/dbConfig");
const Router=require("./src/routers/index")
 //const upload= require("./src/middleware/upload")
const User = require("./src/models/users/users.model");
const Role = require("./src/models/users/role.model");
const Address=require("./src/models/users/address.model")
const Categories= require("./src/models/products/categories.model")
const Products= require("./src/models/products/products.model")
const Images= require("./src/models/images/images.entity")
const Reviews=require("./src/models/reviews/reviews.entity")
const Favorite=require("./src/models/favorite/favorite.entity")
const Cart=require("./src/models/cart/cart.entity")
const OrderItem=require("./src/models/orderItem/orderItem.entity")
app.use(express.json());
app.use(express.urlencoded());
const cors = require("cors");
const cookieParser = require('cookie-parser');
app.use(cors({ credentials: true, origin: "*", methods: "GET,POST,DELETE,PUT,PATCH,OPTIONS" }))
const session = require("express-session");
app.use(express.static(__dirname + '/src/public/uploads'));
// Role.sync().then(() => {
//     console.log("role ok");
// });s
// User.sync().then(() => {
//     console.log("user ok");
// });
// Address.sync().then(() => {
//     console.log("address ok");
// });
// Categories.sync().then(() => {
//     console.log("Categories ok");
// });
// Products.sync().then(() => {
//     console.log("Products ok");
// });
// Images.sync().then(() => {
//     console.log("Images ok");
// });
// Cart.sync().then(() => {
//     console.log("Cart ok");
// });
app.use(cookieParser());
app.use(
    cors({
        credentials: true,
        origin: "*",
        methods: "GET,POST,DELETE,PUT,PATCH,OPTIONS",
    })
);
app.use(
    session({
        secret: process.env.SESSION_KEY || "Nuongkawaii0702",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 3600000 }, // Số milliseconds trong một giờ
    store: new session.MemoryStore()
    }) 
);
Router(app);
app.listen(port, async () => {
    try {
        console.log("vvvvv", __dirname + '/src/public/uploads');
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        console.log("app listen on port");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
    console.log(`Server is running on port http://localhost:${port}`)
})
