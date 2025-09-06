const express = require("express");
const app = express();
require("dotenv").config();
const { default: mongoose } = require("mongoose");

const crbolse = process.env.DB_URL;

// database connectionn

mongoose
  .connect(crbolse)
  .then(() => {
    console.log("db Connected");
  })
  .catch((err) => {
    console.log(err.message || err);
  });

//   route define

app.post("/addtodo", (req, res) => {
  return res
    .status(201)
    .json({ success: true, message: "todo created successfull" });
});

app.get("/gettodo", (req,res)=>{
    return res.status(200).json({ success:true, message: "todo fetch successfully"});
});



app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
