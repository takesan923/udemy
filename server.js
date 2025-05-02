const express = require("express");
const app = express();
const usersRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const PORT = 3000;
const mongoose = require("mongoose");
require("dotenv").config();



//データベース接続
mongoose.connect(process.env.MONGOURL)
.then(() => {
    console.log("DBと接続中・・・");
})
.catch((err) => {
    console.log(err);
});

//ミドルウェアの開発
app.use(express.json());
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// app.get("/",(req, res) =>{
//     res.send("Hello express");
// })

// app.get("/users",(req, res) =>{
//     res.send("users express");
// })



app.listen(PORT, () => console.log("サーバーが起動しました"));　