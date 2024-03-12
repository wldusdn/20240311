const express = require("express");
const router = express.Router();
const {getIndex, getLogin,loginUser,getRegister,registerUser,logout} = require("../controllers/loginController")

router.route("/")
.get(getIndex)

router.route("/login")
.get(getLogin)
.post(loginUser)

router.route("/signup")
.get(getRegister)
.post(registerUser)

router.route("/logout")
.get(logout)

module.exports = router;