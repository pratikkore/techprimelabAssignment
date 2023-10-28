var mongoose = require("mongoose");

//Project table Structure
const projectTable = mongoose.Schema({
  ProjectName: {
    type: String,
    required: true,
  },
  StartDate: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
  Reason: String,
  Type: String,
  Division: String,
  Category: String,
  Priority: String,
  Department: String,
  Location: String,
  Status: {
    type: String,
    default: "Registered",
  },
});

const ProjectModel = mongoose.model("projectdatas", projectTable);

module.exports = { ProjectModel };
