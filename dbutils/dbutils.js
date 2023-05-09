const mongoose = require("mongoose");

const dbinit = () => {
  mongoose
    .connect(process.env.URI, {
      //   userNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("successfully connected to the Local Database");
    })
    .catch((error) => {
      console.log(error);
    });
};
module.exports = { dbinit };
