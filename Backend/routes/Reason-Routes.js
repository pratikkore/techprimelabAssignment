const { reasonModel } = require("../model/Reason-Model");
const express = require("express");
const reasonRoutes = express.Router();
 reasonRoutes.get("/reasonList", async (req, res) => {
    try {
      const reasonList = await reasonModel.find();
      res.json(reasonList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch reason Data" });
    }
  });

  module.exports = reasonRoutes;