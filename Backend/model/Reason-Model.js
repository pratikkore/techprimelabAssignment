var mongoose = require("mongoose");

//Reason table Structure
const ReasonTable = mongoose.Schema({
  Reason: String,
});

const reasonModel = mongoose.model("reasons", ReasonTable);

module.exports = { reasonModel };
