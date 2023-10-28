const { CategoryModel } = require("../model/Category-Model");
const express = require("express");
const categoryRoutes = express.Router();

categoryRoutes.get("/categorylist", async (req, res) => {
    try {
      const categoryList = await CategoryModel.find();
      res.json(categoryList);
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch Category Data" });
    }
  });

  module.exports = categoryRoutes;