var mongoose = require("mongoose");

//priority table Structure
const priorityTable = mongoose.Schema({
  Priority: String,
});

const priorityModel = mongoose.model("prioritys", priorityTable);

module.exports = { priorityModel };
