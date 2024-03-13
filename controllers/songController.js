const express = require("express");
const songs = express.Router();
const {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
} = require("../queries/songs.js");

const {
  checkStringInputs,
  checkBoolean,
} = require("../validations/checkSongs.js");

songs.get("/", async (req, res) => {
  try {
    const query = await getAllSongs(req, res);
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getSong(id);
  if (song) {
    res.json(song);
  } else return res.status(404).json({ error: "Not found" });
});

songs.post("/", checkStringInputs, checkBoolean, async (req, res) => {
  try {
    const song = await createSong(req.body);
    res.json(song);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});

songs.put("/:id", checkStringInputs, checkBoolean, async (req, res) => {
  const { id } = req.params;
  if (id) {
    const updatedSong = await updateSong(id, req.body);
    res.status(200).json(updatedSong);
  } else {
    res.status(400).json({ error });
  }
});

songs.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSong = await deleteSong(id);
    if (deletedSong.id) {
      res.status(200).json(deletedSong);
    } else {
      res.status(400).json("Song not found");
    }
  } catch (error) {}
});

module.exports = songs;
