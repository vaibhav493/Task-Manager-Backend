const mongoose = require("mongoose"); 
require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("server started running on PORT:5500");
    console.log("Connected to Data Base !");
  } catch (err) {
    console.log("Found error while connecting to Data Base : ", err);
  }
};
       
module.exports = {
  dbConnect,
};
