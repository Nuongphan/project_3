const checkRoleUser = (req, res, next) => {
    try {
        const roleNum = req.infor.roleId
        console.log("+++++",roleNum);
        if (roleNum === 2) {
            next()
        } else if (!roleNum) {
            res.status(403).json("Forbidden")
        }
    } catch (error) {
    }
}
module.exports = checkRoleUser
//check đăng nhập => Authentication
//check role => Authorization