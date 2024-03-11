// Dependencies
const express = require("express");
const cors = require("cors");

// middleware
const app = express();
// controller imports

const songsController = require("./controllers/songController.js");

app.use(cors());
app.use(express.json());

// controller middleware
app.use("/api/songs", songsController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Bookmarks App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;