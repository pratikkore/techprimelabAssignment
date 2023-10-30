const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { UserModel } = require("../model/User-Model");
const express = require("express");
const userRoutes = express.Router();
dotenv.config();

userRoutes.post("/login", async (req, res) => {
  try {
    const { UserName, Password } = req.body;
    console.log(UserName);
    const user = await UserModel.findOne({ UserName });
    if (!user) {
      return res.status(404).json({ error: "Invalid username" });
    }

    if (user.Password != Password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{ expiresIn: '5h' });

    res.json({ status: 200, token });
  } catch (e) {
    console.log(e);
    res.status(401).json({ error: "login error" });
  }
});

// Get all users
userRoutes.get("/users", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch users" });
  }
});

module.exports = userRoutes;
