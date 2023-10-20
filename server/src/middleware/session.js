const express = require('express');
const session = require('express-session');
const app = express();
require("dotenv").config()
const crypto = require("crypto");
// Cấu hình express-session
app.use(session({
    secret: process.env.SESSION_KEY || "Nuongkawaii0702", // Thay đổi thành một giá trị bí mật thực tế.
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false, // Trong môi trường thực tế, bạn nên đặt giá trị này là true để sử dụng HTTPS.
    },
  }));
  const sessionUser =(req, res, next)=> {
    const { email } = req.body  
    const length = 10;
    // Sử dụng crypto.randomBytes để tạo buffer ngẫu nhiên
    const randomBytes = crypto.randomBytes(length);
    // Chuyển buffer thành chuỗi hex
    const randomString = randomBytes.toString("hex");
    req.session = {email,randomString };
    console.log(req.session, '==============');
    next();
  }
  module.exports= sessionUser
  