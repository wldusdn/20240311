const asyncHandler = require("express-async-handler");//동기
const User = require("../models/userModel");
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
const bcrypt = require("bcrypt");//암호화
require("dotenv").config();//env파일 사용
const jwt = require("jsonwebtoken");//jwt 사용 위함
const jwtSecret = process.env.JWT_SECRET;//secret키 가져옴

// @desc Get post page
// @route GET /:id
const getPost = asyncHandler(async(req,res)=>{
  const post = await Post.findById(req.params.id);
  const comments = await Comment.find({postID:{$eq:req.params.id}});

  const token = req.cookies.token;
  if (!token) {
    // 토큰이 제공되지 않은 경우 로그인 페이지로 리다이렉트
    return res.redirect('/login'); 
  }
  const decodedUser = jwt.verify(token, jwtSecret);
  const userID = decodedUser.id;
  const user = await User.findById(userID);

  res.render("post", {post, comments, user});
})

// @desc Create comment
// @route Post /:id
const addComment = asyncHandler(async(req,res)=>{
  const {commentContent} = req.body;
  const post = await Post.findById(req.params.id);
  const token = req.cookies.token;
   // 토큰 검증 및 디코딩
  const decodedUser = jwt.verify(token, jwtSecret);
   // 디코딩된 토큰에서 사용자 ID 추출
  const userID = decodedUser.id;
   // 사용자 ID로 사용자 찾기
  const user = await User.findById(userID);
  console.log(post._id);
  console.log(user);
  if(!commentContent){
    return res.status(400).send("필수값이 입력되지 않았습니다")
  }
  const contact = await Comment.create({postID:post._id, userID:user.name, commentContent});
  // res.status(201).send("Create Contents")
  console.log(post)
  res.redirect(`/post/${post._id}`)
})

// @desc get addPost page
// @route GET /add
const getPostadd = asyncHandler(async (req, res)=>{
  const token = req.cookies.token;
  const decodedUser = jwt.verify(token, jwtSecret);
  const userID = decodedUser.id;
  const user = await User.findById(userID);
  res.render("addPost", {user})
})

// @desc Create post
// @route Post /:id
const addPost = asyncHandler(async(req,res)=>{
  const {post_title, post_price, post_desc, post_category, post_location } = req.body;
  if(!post_title || !post_desc || !post_category || !post_location){
    return res.status(400).send("필수값이 입력되지 않았습니다")
  }
  const price = post_price || "제안받음";
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
      user: user.name,
      title: post_title,
      description: post_desc,
      cost: price,
      location: post_location,
      category: post_category,
    });

    // res.status(201).json(post);
    res.redirect(`/post/${post._id}`)
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: '토큰이 유효하지 않습니다.' });
  }
})

// @desc Get mypost page
// @route GET /mypost/:id

const getMyPost = asyncHandler(async(req,res)=>{
  const user = await User.findById(req.params.id)
  const userID = user.userID
  console.log(userID)
  const posts = await Post.find({user:userID})

  res.render("mypost", {user, posts})
})

<<<<<<< HEAD


module.exports = {getPost, addComment, getPostadd, addPost, getMyPost}
=======
// @desc Get Search page
// @route Get /search/:id

const getSearchPost = asyncHandler(async (req,res) => {
  // console.log(req.params.id)
  console.log(req.query.id)
  const searchID = req.query.id
  const posts = await Post.find();
  const token = req.cookies.token;
  const decodedUser = jwt.verify(token, jwtSecret);
  const userID = decodedUser.id;
  const user = await User.findById(userID);

  res.render("search",{searchID, posts, user})
})

module.exports = {getPost, addComment, getPostadd, addPost, getMyPost, getSearchPost}
>>>>>>> a97b3ab688551143d64076a706897097ab01e583
