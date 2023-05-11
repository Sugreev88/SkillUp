const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());

const PORT = process.env.port;
const dbutil = require("./dbutils/dbutils");
dbutil.dbinit();
const userRoute = require("./route/userRoutes");

app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
