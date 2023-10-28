const { deptModel } = require("../model/Department-Model");
const express = require("express");
const deptRoutes = express.Router();

deptRoutes.get("/deptlist", async (req, res) => {
    try {
      const categoryList = await deptModel.find();
      res.json(categoryList);
    } catch (error) {
        console.log(error);
      res.status(500).json({ error: "Unable to fetch department Data" });
    }
  });

  module.exports = deptRoutes;