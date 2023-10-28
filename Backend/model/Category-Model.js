var mongoose = require("mongoose");

//Category table Structure
const CategoryTable = mongoose.Schema({
  Category: String,
});

const CategoryModel = mongoose.model("categories", CategoryTable);

module.exports = { CategoryModel };
