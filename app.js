const express = require('express');
const dbConnect = require('./config/dbConnect')
const methodOverride = require("method-override")

const app = express()
app.set("view engine", "ejs");
app.set("views", "./views");//html->ejs로 바꾸기

app.use(express.static("./assets"));//정적 파일 디렉토리 설정(css경로 접근 시 사용)
app.use(methodOverride("_method"));

const port = 3000;
dbConnect();//db 연결

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/",require("./routes/loginRoutes"));
// app.use("/post", require("./routes/postRoutes"));

app.listen(port, ()=>{
  console.log("서버 시작!")
});