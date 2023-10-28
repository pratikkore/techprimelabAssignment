const { priorityModel } = require("../model/Priority-Model");
const express = require("express");
const priorityRoutes = express.Router();
 priorityRoutes.get("/priorityList", async (req, res) => {
    try {
      const priorityList = await priorityModel.find();
      res.json(priorityList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch priority Data" });
    }
  });

  module.exports = priorityRoutes;