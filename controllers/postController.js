const asyncHandler = require("express-async-handler");//동기
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const bcrypt = require("bcrypt");//암호화
require("dotenv").config();//env파일 사용
const jwt = require("jsonwebtoken");//jwt 사용 위함
const jwtSecret = process.env.JWT_SECRET;//secret키 가져옴

// @desc Get post page
// @route GET /
const getPost = asyncHandler(async(req,res)=>{
  const post = await Post.findById(req.params.id);
  console.log(post)
  const comments = await Comment.find();
  res.render("post", {post, comments});
})

// @desc Create contacts
// @route Post /contacts/add
const addComment = asyncHandler(async(req,res)=>{
  const {commentContent} = req.body;
  const post = await Post.findById(req.params.id);
  const user = req.user;
  console.log(user);
  if(!commentContent){
    return res.status(400).send("필수값이 입력되지 않았습니다")
  }
  const contact = await Comment.create({postID:post, userID:user, commentContent});
  // res.status(201).send("Create Contents")
  console.log(post)
  res.redirect(`/post/${post._id}`)
})

const getPostadd = (req, res)=>{
  res.render("addPost")
}

const addPost = asyncHandler(async(req,res)=>{
  console.log(req.body)
  const {post_title, post_price, post_desc, post_img, post_location } = req.body;
  if(!post_title || !post_price || !post_desc || !post_img || !post_location){
    return res.status(400).send("필수값이 입력되지 않았습니다")
  }
  try {
   // 쿠키에서 토큰 추출
   const token = req.cookies.token;

   // 토큰 검증 및 디코딩
   const decodedUser = jwt.verify(token, jwtSecret);

   // 디코딩된 토큰에서 사용자 ID 추출
   const userID = decodedUser.id;

   // 사용자 ID로 사용자 찾기
   const user = await User.findById(userID);

   if (!user) {
     return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
   }
    // const userID = req.user;
    const post = await Post.create({
      user: user._id,
      title:post_title,
      description:post_desc,
      cost:post_price,
      location:post_location,
      postimage:post_img,
    });

    res.status(201).json(post);
    res.redirect(`/post/${post._id}`)
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
  }
})

module.exports = {getPost, addComment, getPostadd, addPost}