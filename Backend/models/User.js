const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  github: {
    type: String,
  },
  skills: [
    {
      type: String,
    },
  ],
  projects: [projectSchema],

  profilePic: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);