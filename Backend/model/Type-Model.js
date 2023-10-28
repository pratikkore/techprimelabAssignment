var mongoose = require("mongoose");

//Type table Structure
const typeTable = mongoose.Schema({
  Type: String,
});

const TypeModel = mongoose.model("types", typeTable);

module.exports = { TypeModel };
