const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  age: Number,
  country: String,
  password: String,
  created_at: { type: Date, default: Date.now }
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
