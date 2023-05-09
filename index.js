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
const port = 3000;

// Body parser middleware
app.use(express.json());

// Use questionBankRoutes
app.use("/api", questionBankRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
