const mongoose = require("mongoose");
//구조 정의가 필요함
const userSchema = new mongoose.Schema({
    userID:{
      type:String,
      required:true,
      unique: true,
    },
    password:{
      type:String,
      required:true,
    },
    name:{
      type:String,
      required:true,
    },
    contact:{
      type:String,
      required:true,
    },
  });

module.exports = mongoose.model("User",userSchema);