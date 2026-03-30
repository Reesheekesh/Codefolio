const userRoutes = require("./routes/userRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
console.log(err);
});
app.get("/", (req, res) => {
    res.send("CodeFolio API Running");
});
app.listen(5000, () => {
    console.log("Server running on port 5000");
});
