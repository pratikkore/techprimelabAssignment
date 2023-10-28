var mongoose = require("mongoose");

//department table Structure
const DepatmentTable = mongoose.Schema({
  Depatment: String,
});

const deptModel = mongoose.model("departments", DepatmentTable);

module.exports = { deptModel };
