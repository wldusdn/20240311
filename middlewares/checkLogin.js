require("dotenv").config();//env파일 사용
const jwt = require("jsonwebtoken");//jwt 사용 위함
const jwtSecret = process.env.JWT_SECRET;//secret키 가져옴

const checkLogin = async(req, res, next)=>{
  res.setHeader("Cache-Control", "no-cache, no-store, must-validate");
  const token = req.cookies.token;
  if(!token){
    return res.redirect("/");
  }
  try {
    const decoded = jwt.verify(token, jwtSecret)
    req.userID = decoded.userID
    next()
  } catch (error) {
    return res.status(401).json({message:"로그인이 필요합니다."})
  }
}

module.exports = checkLogin;