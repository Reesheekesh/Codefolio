const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const User = require("./models/User"); // ✅ ADD THIS

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", userRoutes);

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("Mongo Error ❌", err));

// test route
app.get("/", (req, res) => {
  res.send("CodeFolio API Running");
});

// get user
app.get("/api/user/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// server
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});