const mongoose = require("mongoose");
const userdataSchema = new mongoose.Schema({
  uniqueid: { type: String },
  title: { type: String, required: true },
  status: Boolean,
});
const UserdataModel = mongoose.model("users", userdataSchema);
module.exports = { UserdataModel };
