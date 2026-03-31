const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 🔥 Create User
router.post("/create-user", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      bio: req.body.bio,
      github: req.body.github,
      skills: req.body.skills || [],
      projects: req.body.projects || [],
      profilePic: req.body.profilePic || "", // 🔥 ensure always exists
    });

    const savedUser = await newUser.save();

    console.log("User created:", savedUser);

    res.json(savedUser);
  } catch (error) {
    console.error("CREATE USER ERROR:", error);
    res.status(500).json({
      message: "Server Error while creating user",
      error: error.message,
    });
  }
});

// 🔥 Get User by username
router.get("/user/:username", async (req, res) => {
  try {
    console.log("Searching for user:", req.params.username);

    const user = await User.findOne({
      username: req.params.username,
    });

    if (!user) {
      console.log("User not found:", req.params.username);
      return res.status(404).json({
        message: "User not found",
      });
    }

    console.log("User found:", user);

    res.json(user);
  } catch (error) {
    console.error("GET USER ERROR:", error);
    res.status(500).json({
      message: "Server Error while fetching user",
      error: error.message,
    });
  }
});

module.exports = router;