const express = require("express");
const cors = require("cors");

const app = express();

const songController = require("./controllers/songController.js");

app.use(cors());
app.use(express.json());

app.use("/api/songs", songController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to TUNER App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;