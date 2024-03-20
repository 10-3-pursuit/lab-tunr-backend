const express = require("express");
const cors = require("cors");

const app = express();

const songController = require("./controllers/songController");
const playlistController = require("./controllers/playlistController");

app.use(cors());
app.use(express.json());

app.use("/songs", songController);
app.use("/playlists", playlistController);

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Tunr App");
});

// 404 PAGE
app.get("*", (req, res) => {
  res.json({ error: "Page not found" });
});
// EXPORT
module.exports = app;
