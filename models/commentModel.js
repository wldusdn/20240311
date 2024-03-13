const mongoose = require("mongoose");
//구조 정의가 필요함
const commentSchema = new mongoose.Schema({
  postID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post', //참조 컬렉션
    required:false,
    },
    userID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //참조 컬렉션
      required:false,
      },
  commentContent:{
    type:String,
    required:true,
  },
  },
  {timestamps:true}
  );

module.exports = mongoose.model("Comment",commentSchema);