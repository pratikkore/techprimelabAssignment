var mongoose = require("mongoose");

//divison table Structure
const divisonTable = mongoose.Schema({
  Division: String,
});

const divisonModel = mongoose.model("divisions", divisonTable);

module.exports = { divisonModel };
