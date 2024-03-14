const express = require("express");
const songs = express.Router();

// storing the router in an object called songs
const {
  getAllSongs,
  getOneSong,
  createSong,
  updateSong,
  deleteSong,
} = require("../queries/songs");

const {
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
} = require("../validations/checkSongs");

// INDEX
songs.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM songs";
    const { order, is_favorite } = req.query;

    // Handle sorting
    if (order) {
      query +=
        order.toLowerCase() === "asc"
          ? " ORDER BY name ASC"
          : " ORDER BY name DESC";
    }

    // Filter by is_favorite
    if (is_favorite !== undefined) {
      const isFavorite = is_favorite === "true";
      query += ` WHERE is_favorite = ${isFavorite}`;
    }

    const allSongs = await getAllSongs(); // Using function from queries/songs.js
    res.status(200).json(allSongs);
  } catch (error) {
    console.error(error);
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

//to update/edit a song
songs.put(
  "/:id",
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
  async (req, res) => {
    const { id } = req.params;
    if (id) {
      const updatedSong = await updateSong(id, req.body);
      res.status(200).json(updatedSong);
    } else {
      res.status(400).json("Song not found");
    }
  }
);

// to delete a song
songs.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedSong = await deleteSong(id);
  if (deletedSong.id) {
    res.status(200).json({ message: "song was successfully deleted" });
  } else {
    res.status(404).json("Song not found");
  }
});

module.exports = songs;
