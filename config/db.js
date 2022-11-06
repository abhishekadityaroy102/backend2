const mongoose = require("mongoose");
require("dotenv").config();
const databaseurl = process.env.DATABASE;
console.log(databaseurl);
const connection = mongoose.connect(databaseurl);
module.exports = { connection };
