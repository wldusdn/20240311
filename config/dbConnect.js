const mongoose = require("mongoose");
require('dotenv').config();

const dbConnect = async()=>{
  try{
    // const connect = await mongoose.connect(process.env.DB_LOCAL_URL);//로컬 DB
    const connect = await mongoose.connect(process.env.DB_ATLAS_URL);//공용 DB
    console.log('DB 연결됨!');
  }catch(err){
    console.log(err);
  }
}

module.exports = dbConnect;