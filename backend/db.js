const mongoose = require("mongoose");

const url =
  "mongodb+srv://aishwarya:aishwarya123@moviedb.mdcoclz.mongodb.net/?retryWrites=true&w=majority&appName=MovieDB";

module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
