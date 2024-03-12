const express = require("express");
const songs = express.Router();

// storing the router in an object called songs
const { getAllSongs } = require("../queries/songs");

// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});
module.exports = songs;
