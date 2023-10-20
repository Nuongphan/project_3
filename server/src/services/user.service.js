const User = require("../models/users/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository")
const Sequelize = require('sequelize');
const sendPassword = require("../controllers/mailjet.controller")
const Address = require("../models/users/address.model")
const generateToken = require("../middleware/genaralToken")
class UserService {
    // đăng ký
    async register(data) {
        const { fullName, avatar, password, email, repeatpassword, roleinput } = data
        try {
            const roleRepo = await userRepo.register(email)
            const role = roleRepo.roleUser.dataValues.id
            const roleId = roleinput ? roleinput : role
            const checkUser = await userRepo.register(email)
            console.log(checkUser);
            if (checkUser.userr) {
                return { msg: 'email already existed', status: 409 }
            }
            if (password == repeatpassword) {
                const salt = 10 //số lần lặp để mã hoá => thường là 10-12
                const genSalt = await bcrypt.genSalt(salt)
                const newPassword = await bcrypt.hash(password, genSalt)
                const newUser = await userRepo.regissterr({ fullName, avatar, newPassword, email, repeatpassword, roleId })
                return { msg: "Register successfully", status: 200, data: newUser }
            } else {
                return { msg: 'Password does not match', status: 409 }
            }
        }
        catch (error) {
            console.log("er", error);
            return { msg: 'Error', status: 400 }
        }
    }
    // đăng nhập
    async login(data) {
        const { email, password } = data;
        try {
            //check U sơ có đúng không
            const checkUser = await userRepo.login(email)
            if (!checkUser) {
                return ({ msg: 'Password or email is not valid', status: 401 })
            }
            //sau khi check U sơ thành công sẽ check password gửi lên đúng không
            const checkPass = await bcrypt.compare(password, checkUser.dataValues.password) // trả về giá trị true hoặc false 2 tham số (password gửi lên,password trong db)
            if (checkPass) {
                const { password, ...data } = checkUser.dataValues
                const jwtData = generateToken(checkUser)
                // const jwtData = jwt.sign(data, process.env.ACCESS_TOKEN_SCERET)
                return ({ msg: "login successfully", accessToken: jwtData, data: data, status: 200 })
            } else {
                return ({ msg: 'Password or email is not valid', status: 401 })
            }
        } catch (error) {
            console.log("3333333333", error);
            return ({ msg: "Error", status: 400 })
        }
    }
    // lấy về toàn bộ user
    async getAllUser() {
        try {
            const data = await userRepo.getAllUser()
            return { msg: "success", result: data, status: 200 }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    // Thay đổi trạng thái user
    async changeStatus(id) {
        try {
            const data = await userRepo.updateStatus(id)
            return { msg: "success", result: data, status: 200 }
        } catch (error) {
            console.log(error);
            return { msg: "error", status: 400 }
        }
    }
    // show forgot password
    async showForgotPassword() {
        try {
            return { msg: "success", status: 200 }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    // forgot password
    async forgotPassword(data) {
        const { email, randomString } = data
        if (!email) {
            return { msg: "Email is required", status: 500 }
        }
        try {
            const userForgotPassword = await userRepo.forgotPassword(email)
            if (userForgotPassword) {
                await sendPassword(userForgotPassword, randomString)
                return { msg: "sent email", status: 200, data: randomString }
            } else {
                return { msg: "user not found", status: 400 }
            }
        }
        catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    // show reset password
    async showResetPassword() {
        try {
            return { msg: "success", status: 200 }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    async resetPassword(data) {
        const { email, codeReset, codeInput, password } = data
        if (!password || !codeInput) {
            return { msg: "Password or code is required", status: 500 }
        }
        if (codeReset !== codeInput) {
            return { msg: "Invalid reset code", status: 400 }
        }
        try {
            const user = await userRepo.resetPassword(email)
            if (!user) {
                return { msg: "Invalid email address.", status: 400 }
            }
            const saltRounds = 10; // Số lần lặp để mã hóa (thường là 10-12)
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newPassword = await userRepo.resetPassword({ hashedPassword, email })
            return { msg: "Password reset successfully", status: 200, data: newPassword }
        } catch (error) {
            return { msg: "Password reset failed", status: 500 }
        }
    }
    // lấy toàn bộ thông tin của một user
    async getInforUser(id) {
        const user = await userRepo.getInforUser(id)
        if (!user) {
            return { msg: "user not found", status: 404 }
        }
        try {
            const inforUser = await userRepo.getInforUser(id)
            return { msg: "success", status: 200, data: inforUser }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    //thêm thông tin địa chỉ user
    async createAddress(data) {
        const { address, phone, id , name} = data
        try {
            const newAddress = await userRepo.createAddresss({name, address, phone, id })
            return { msg: "created successfully", status: 200, data: newAddress }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    // delete address 
    async deleteAddress(data) {
        const { idUser, idAddress } = data
        const user = await userRepo.deleteAddress(idUser)
        if (!user) {
            return { msg: "user not found", status: 404 }
        }
        try {
            const result = await userRepo.deleteeAddress(idAddress)
            // await Address.destroy({ where: { id: idAddress } })
            return { msg: "deleted", status: 200, data: result }
        } catch (error) {
            return { msg: "error", status: 400 }
        }
    }
    // chỉnh sửa địa chỉ 
    async updateAddress(data) {
        const { idUser, idAddress, address, phone } = data
        const user = await userRepo.updateAddress(idUser)
        if (!user) {
            return { msg: "user not found", status: 404 }
        }
        try {
            const result = await userRepo.updateeAddress({ idAddress, address, phone })
            return { msg: "updated successfully", status: 200, data: result }
        } catch (error) {
            return { msg: "error updating address", status: 400 }
        }
    }
}

module.exports = new UserService()