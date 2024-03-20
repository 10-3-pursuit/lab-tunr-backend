// Dependencies
const express = require("express");

const playlists = express.Router();

// Queries
const {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} = require("../queries/playlists");
const {
  setPlaylist_IdToNull,
  getAllPlaylistSongs,
} = require("../queries/songs");

playlists.get("/", async (req, res) => {
  try {
    const allPlaylists = await getAllPlaylists();
    res.status(200).json(allPlaylists);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

playlists.get("/:id", async (req, res) => {
  const { id } = req.params;
  const playlist = await getPlaylist(id);
  const songs = await getAllPlaylistSongs(id);
  if (playlist) {
    res.json({ ...playlist, songs });
  } else return res.status(404).json({ error: "Not found" });
});

playlists.post("/", async (req, res) => {
  try {
    const newPlaylist = await createPlaylist(req.body);
    res.json(newPlaylist);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

playlists.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const updatedPlaylist = await updatePlaylist({ id, ...req.body });
    res.status(200).json(updatedPlaylist);
  } else {
    res.status(400).json({ error });
  }
});

playlists.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    if (deletedPlaylist.id) {
      setPlaylist_IdToNull(id);
      res.status(200).json(deletedPlaylist);
    } else {
      res.status(400).json("Playlist not found");
    }
  } catch (error) {
    res.status(400).json("Playlist not found");
  }
});

module.exports = playlists;
