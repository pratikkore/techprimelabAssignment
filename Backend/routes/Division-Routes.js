const { divisonModel } = require("../model/Division-Model");
const express = require("express");
const divisionRoutes = express.Router();
 divisionRoutes.get("/divisionlist", async (req, res) => {
    try {
      const divisionlist = await divisonModel.find();
      res.json(divisionlist);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch division Data" });
    }
  });

  module.exports = divisionRoutes;