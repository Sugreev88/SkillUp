const mongoose = require("mongoose");

// require("dotenv").config();
// const initDB = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       //   userNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log("successfully connected to the Local Database");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// module.exports = { initDB };

//const mongoose = require('mongoose');
const MONGO_URI = "mongodb://0.0.0.0:27017/skillup";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
