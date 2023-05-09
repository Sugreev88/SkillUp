// const express = require("express");
// require("dotenv").config();
// const app = express();
// const PORT = process.env.port || 3000;
// const questionSchema = require("../models/Question");
// const router = require("./controller/questionBankController");
// app.use("/question", router);

// app.get("/", (req, res) => {
//   res.send("hello world");
// });

//
const express = require("express");
const mongoose = require("mongoose");
const questionBankRoutes = require("./route/questionBankRoutes");
const connectDB = require("./dbutils/dbutils");
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.port;
const dbutil = require("./dbutils/dbutils");
dbutil.dbinit();
const userRoute = require("./route/userRoutes");

app.use("/user", userRoute);

app.get("/user", (req, res) => {
  res.status(200).send("hello world");
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
