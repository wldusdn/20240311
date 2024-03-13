const mongoose = require("mongoose");
//구조 정의가 필요함
const commentSchema = new mongoose.Schema({
  postID:{
    type: String,
    required:false,//true로 나중에 바꾸기
    },
    userID:{
      type: String,
      required:false,//true로 나중에 바꾸기
      },
  commentContent:{
    type:String,
    required:true,
  },
  },
  {timestamps:true}
  );

module.exports = mongoose.model("Comment",commentSchema);