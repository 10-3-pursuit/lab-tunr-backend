// Dependencies
const express = require("express");

const playlists = express.Router({ mergeParams: true });

const { getAllSongs } = require("../queries/songs.js");

// Queries
const { getAllPlaylists } = require("../queries/playlists.js");

// INDEX
playlists.get("/", async (req, res) => {
  const { playlist_id } = req.params;
  const allPlaylists = await getAllPlaylists(playlist_id);
  const song = await getAllSongs(playlist_id);

  if (songs_id) {
    res.status(200).json({ ...song, allPlaylists });
  } else {
    res.status(500).json({ error: "Song not found or server error" });
  }
});
module.exports = playlists;
