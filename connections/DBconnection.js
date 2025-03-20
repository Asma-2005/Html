const mongoose = require("mongoose");


const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://0.0.0.0:27017/");
    console.log("Connected to database!");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB ;
