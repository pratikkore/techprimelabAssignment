const { TypeModel } = require("../model/Type-Model");
const express = require("express");
const typeRoutes = express.Router();
 typeRoutes.get("/typeList", async (req, res) => {
    try {
      const typeList = await TypeModel.find();
      res.json(typeList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch type Data" });
    }
  });

  module.exports = typeRoutes;