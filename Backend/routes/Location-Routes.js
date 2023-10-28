const { locationModel } = require("../model/Location-Model");
const express = require("express");
const locationRoutes = express.Router();
 locationRoutes.get("/locationlist", async (req, res) => {
    try {
      const locationlist = await locationModel.find();
      res.json(locationlist);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch location Data" });
    }
  });

  module.exports = locationRoutes;