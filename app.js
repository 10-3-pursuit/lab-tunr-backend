const express = require("express");
const cors = require("cors");

const app = express();

const songsController = require("./controllers/songsController.js");
const playlistsController = require("./controllers/playlistsController.js");

app.use(cors());
app.use(express.json());

app.use("/songs", songsController)
app.use("/playlists", playlistsController)

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Tuner");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
