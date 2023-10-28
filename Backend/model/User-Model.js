const mongoose = require("mongoose");

//Project table Structure

const userTable = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
});

const   UserModel = mongoose.model("user", userTable);

module.exports = { UserModel };
