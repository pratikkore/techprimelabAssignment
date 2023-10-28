var mongoose = require("mongoose");

//location table Structure
const locationTable = mongoose.Schema({
  Location: String,
});

const locationModel = mongoose.model("locations", locationTable);

module.exports = { locationModel };
