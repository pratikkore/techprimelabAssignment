const { UserModel } = require("../model/User-Model");
const express = require("express");
const userRoutes = express.Router();

userRoutes.post("/login", async (req, res) => {
  try {
    // console.log(req);
    const { UserName, Password } = req.body;
    console.log(UserName);
    const user = await UserModel.findOne({ UserName });
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: "Invalid username" });
    }

    if (user.Password != Password) {
      return res.status(401).json({ error: "Invalid password" });
    }
    res.json({ status: 200, Msg: "Login succefull" });
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
