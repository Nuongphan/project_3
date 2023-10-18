const User = require("../models/users/users.model")
const Role = require("../models/users/role.model")
const Address = require("../models/users/address.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const sendPassword = require("./mailjet.controller")
const userService = require('../services/user.service')
class UserController {
    // đăng ký
    async register(req, res) {
        const avatar = req.file ? req.file.filename : "https://w7.pngwing.com/pngs/4/736/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon-thumbnail.png"
        const { password, email, repeatpassword, roleinput, fullName } = req.body
        const result = await userService.register({ avatar, password, email, repeatpassword, roleinput, fullName })
        return res.status(result.status).json(result)
    }
    // xoá 
    async deleteUser(req, res) {
        const { id } = req.params
        try {
            const checkUser = await User.findOne({ where: { id: id } })
            if (!checkUser) {
                return res.status(404).json({ msg: 'User not found' })
            }
            await User.destroy({ where: { id: id } })
            res.status(200).json({ msg: "Delete successfully" })
        } catch (error) {
            res.status(400).json({ msg: 'Error' })
        }
    }
    // đăng nhập
    async login(req, res) {
        const { email, password } = req.body
        const result = await userService.login({ email, password })
        return res.status(result.status).json(result)
    }
    // lấy về toàn bộ user
    async getAllUser(req, res) {
        const result = await userService.getAllUser()
        return res.status(result.status).json(result)
    }
    // thay đổi trạng thái hoạt động của user
    async changeStatus(req, res) {
        const { id } = req.params
        const result = await userService.changeStatus(id)
        return res.status(result.status).json(result)
    }
    // show forgot password
    async showForgotPassword(req, res) {
        const result = await userService.showForgotPassword()
        return res.status(result.status).json(result)
    }
    // forgot password
    async forgotPassword(req, res) {
        const { email } = req.body;
        const length = 10;
        // Sử dụng crypto.randomBytes để tạo buffer ngẫu nhiên
        const randomBytes = crypto.randomBytes(length);
        // Chuyển buffer thành chuỗi hex
        const randomString = randomBytes.toString("hex");
        res.cookie('email',email, { httpOnly: true });
        res.cookie('randomString',randomString, { httpOnly: true });0
        req.session.user = { email, randomString }
        console.log("================",req.session.user);
        const result = await userService.forgotPassword({ email, randomString })
        return res.status(result.status).json(result)
    }
    // show reset password
    async showResetPassword(req, res) {
        const result = await userService.showResetPassword()
        return res.status(result.status).json(result)
    }
    // reset password
    async resetPassword(req, res) {
        const emailCookie = req.cookies.email;
        const codeCookie = req.cookies.randomString;
        console.log("(((((((((((", emailCookie, codeCookie);
        console.log("req.session", req.session);
        console.log("----------------", req?.session?.user);
        const email = req.session?.user?.email;
        const codeReset = req.session?.user?.randomString;
        const codeInput = req.body.code;
        const password = req.body.password;
        console.log("4356788976543", codeReset, codeInput, password,email);
        const result = await userService.resetPassword({ email, codeReset, codeInput, password })
        return res.status(result.status).json(result)
    }
    // lấy toàn bộ thông tin của một user
    async getInforUser(req, res) {
        const { id } = req.params
        const result = await userService.getInforUser(id)
        return res.status(result.status).json(result)
    }
    //thêm thông tin địa chỉ user
    async createAddress(req, res) {
        const { id } = req.params
        const { address, phone } = req.body
        const result=await userService.createAddress({address, phone, id})
        return res.status(result.status).json(result)
    }
    // delete address 
    async deleteAddress(req, res) {
        const { idUser, idAddress } = req.params
        const result= await userService.deleteAddress({idUser, idAddress })
        return res.status(result.status).json(result)
    }
    // Update địa chỉ user 
    async updateAddress(req, res) {
        const { idUser, idAddress } = req.params
        const { address, phone } = req.body
        const result= await userService.updateAddress({ idUser, idAddress,  address, phone })
        return res.status(result.status).json(result)
    }
}

module.exports = new UserController()