const express = require("express");
const { default: mongoose } = require("mongoose");
const Todo = require("./model/todoSchema");
const app = express();
require("dotenv").config();
const crbolse = process.env.DB_URL;
app.use(express.json());
// database connectionn

mongoose
  .connect(crbolse)
  .then(() => {
    console.log("db Connected ");
  })
  .catch((err) => {
    console.log(err.message || err);
  });

//   route define
// creat Task Api
app.post("/addtodo", async (req, res) => {
  let { name, age } = req.body;

  let todo = new Todo({
    name,
    age,
  });
  await todo.save();
  return res.status(201).json({
    success: true,
    message: "todo created successfull",
    data: todo,
  });
});

// name, age, address
// Getall task Api
app.get("/getalltodo", async (req, res) => {
  try {
    let alltodo = await Todo.find({});
    return res.status(200).json({
      success: true,
      message: "todo fetch successfully",
      data: alltodo,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// single task api

app.get("/gettask/:name", async (req, res) => {
  try {
    let { name } = req.params;

    let singletask = await Todo.findOne({ name });

    return res.status(200).json({
      success: true,
      message: "single task fetch succesfull",
      data: singletask,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// todo update api

app.patch("/edittask/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { age } = req.body;

    let edittask = await Todo.findOneAndUpdate(
      { _id: id },
      { age: age },
      { new: true }
    );

    return res
      .status(200)
      .json({ success: true, message: "updated success", data: edittask });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: err.message || err });
  }
});

// deleted task api

app.delete("/deletetask/:id", async (req, res) => {
  try {
    let { id } = req.params;

    let deletetask = await Todo.findOneAndDelete({ _id: id }, { new: true });

    return res.status(200).json({
      success: true,
      message: "deleted successfully",
      data: deletetask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err.message || err,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running port number ${process.env.PORT}`);
});
