const asyncHandler = require("express-async-handler");//동기
const User = require("../models/userModel");
const Post = require("../models/postModel");
const bcrypt = require("bcrypt");//암호화
require("dotenv").config();//env파일 사용
const jwt = require("jsonwebtoken");//jwt 사용 위함
const jwtSecret = process.env.JWT_SECRET;//secret키 가져옴
const mongoose = require("mongoose");

// @desc Get main page
// @route GET /
const getIndex = asyncHandler(async(req, res) => {
  const posts = await Post.find()
  res.render("index",{posts:posts});
})

// @desc Get Login page
// @route GET /login
const getLogin = (req, res) => {
  res.render("login");
}

// @desc Login user
// @route POST /login
const loginUser = asyncHandler(async(req, res) => {
  console.log(req.body)
  const {userID, password} = req.body;
  const user = await User.findOne({userID})
  console.log(user)
  if(!user){
    return res.status(401).json({message:"일치하는 사용자가 없습니다."})
  }
  const isMatch = await bcrypt.compare(password, user.password);//id 있으면 비번비교
  if(!isMatch){
    return res.status(401).json({message:"비밀번호가 일치하지 않습니다."})
  }
  const token = jwt.sign({id:user._id}, jwtSecret);
  res.cookie("token", token, {httpOnly:true})
  // return res.redirect("/loginindex")
  return res.render("login_index", {user})
})

// @dexc Get Login main page
// @route GET /loginindex
const getLoginIndex = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  const decodedUser = jwt.verify(token, jwtSecret);
  const userID = decodedUser.id;
  const user = await User.findById(userID);
  res.render("login_index", {user})
})

// @desc Get register page
// @route GET /register
const getRegister = (req, res) => {
  res.render("signup")
}

// @desc regist user
// @route POST /register
const registerUser = asyncHandler(async(req, res) => {
  const {userID, password, password2, name, contact} = req.body;
  if(password === password2){
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({userID,password:hashPassword, name, contact});
    return res.redirect("/login")
  }else{
    res.send("다시 회원가입 해주세요");
  }
})

// @desc logout
// @route POST /logout
const logout = (req,res)=>{
  res.clearCookie("token")
  res.redirect("/")
}

module.exports = {getIndex, getLogin,loginUser,getRegister,registerUser,logout,getLoginIndex}