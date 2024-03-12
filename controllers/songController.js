const express = require("express");
const songs = express.Router();

// storing the router in an object called songs
const { getAllSongs, getOneSong, createSong } = require("../queries/songs");

const {
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
} = require("../validations/checkSongs");
// INDEX
songs.get("/", async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: "server error" });
  }
});

// get ONE song
songs.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await getOneSong(id);
  if (song) {
    res.json(song);
  } else {
    res.status(404).json({ error: "not found" });
  }
});

// route to create a song
songs.post(
  "/",
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
  async (req, res) => {
    try {
      const song = await createSong(req.body);

      res.json(song);
    } catch (error) {
      res.status(400).json({ error });
    }
  }
);
module.exports = songs;
