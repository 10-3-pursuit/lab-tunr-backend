const express = require("express");

// storing the router in an object called songs
const { getAllSongs } = require("../queries/songs");

const songs = express.Router();

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
