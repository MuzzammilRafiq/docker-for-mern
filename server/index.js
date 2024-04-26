const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
dotenv.config();

//models start
const TaskSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", TaskSchema);
//models end

//routes start
app.use("/", async (req, res, next) => {
  next();
});
app.post("/task", async (req, res) => {
  try {
    const task = req.body.task;
    const response = await Task.create({ data: task });
    if (!response) {
      return res.status(422).json({ message: "error at creating task" });
    }
    return res
      .status(201)
      .json({ message: "successfully created", task: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.get("/task", async (req, res) => {
  try {
    const response = await Task.find();
    if (!response) {
      return res.status(404).json({ message: "no data" });
    }
    return res.status(200).json({ message: "list of tasks", tasks: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.delete("/task/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const response = await Task.deleteOne({ _id });
    if (!response) {
      console.log(response);
      return res.status(404).json({ message: "error while deleting" });
    }
    return res.status(200).json({ message: "deletd successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

app.put("/task:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const data = req.body.data;
    const response = await Task.updateOne({ _id }, { data });
    if (!response) {
      return res.status(400).json({ message: "error while updating" });
    }
    return res
      .status(200)
      .json({ message: "updated successfully", tasks: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});
//routes end

const PORT = process.env.PORT || 3001;

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((_) => console.log("connect to db"))
    .catch((e) => console.log(e));
};

app.listen(PORT, () => {
  connectDB();
  console.log("listing on port...", PORT);
});
