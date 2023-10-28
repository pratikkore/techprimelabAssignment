const { ProjectModel } = require("../model/Project-Model");
const express = require("express");
const projectRoutes = express.Router();

projectRoutes.post("/save", async (req, res) => {
  try {
    const projectData = req.body;
    const project = new ProjectModel(projectData);
    await project.save();
    res.json({ status: 200, Msg: "Project Data Saved  Successfully..." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong while saveing Project Data.." });
  }
});

projectRoutes.get("/projectList", async (req, res) => {
  try {
    const sort = req.query.sortField;

    let sortQuery = {};
    if (sort !== "") {
      const [field, order] = sort.split(":");
      sortQuery[field] = order === "asc" ? -1 : 1;
    }
    const data = await ProjectModel.find()
      .sort(sortQuery);
    res.status(200).json({ data: data });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch Projects.." });
  }
});

projectRoutes.get("/projectStatusCount", async (req, res) => {
  try {
    const totalCount = await ProjectModel.countDocuments();
    const canceledCount = await ProjectModel.countDocuments({
      Status: "Cancelled",
    });
    const closedCount = await ProjectModel.countDocuments({ Status: "Closed" });
    const runningCount = await ProjectModel.countDocuments({
      Status: "Running",
    });
    const currentDate = new Date();
    const colsureDelayCount = await ProjectModel.countDocuments({
      Status: "Running",
      Enddate: { $lt: currentDate },
    });
    const registeredCount = await ProjectModel.countDocuments({
      Status: "Registered",
    });

    return res.status(200).json({
      total: totalCount,
      closed: closedCount,
      running: runningCount,
      colsureDelay: colsureDelayCount,
      canceled: canceledCount,
      registered: registeredCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

projectRoutes.get("/chart", async (req, res) => {
  try { 
    const pipeline = [
      {
        $group: {
          _id: "$Department",
          TotalCount: { $sum: 1 },
          closedCount: {
            $sum: { $cond: [{ $eq: ["$Status", "Closed"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          department: "$_id",
          TotalCount: 1,
          closedCount: 1,
          successPercentage: { $multiply: [{ $divide: ["$closedCount", "$TotalCount"] }, 100] },
        },
      },
    ];

    const departmentStats = await ProjectModel.aggregate(pipeline);

    return res.status(200).json(departmentStats);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch department crtas" });
  }
});

projectRoutes.patch("/updateStatus/:id/:status", async (req, res) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(req.params.id, { Status: req.params.status }, { new: true });;
    res.json(updatedProject || { error: "Project not found" });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update project status" });
  }
});



module.exports = projectRoutes;
