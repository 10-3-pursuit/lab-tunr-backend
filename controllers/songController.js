// Importing the express framework
const express = require("express");
// Creating an instance of the express router
const songs = express.Router();

// Importing functions for CRUD operations on songs from queries/songs.js
// storing a router in an object called songs
const {
  getAllSongs,
  getOneSong,
  createSong,
  updateSong,
  deleteSong,
  getAllSongsAscOrder,
  getAllSongsDescOrder,
  getFilteredSongs,
} = require("../queries/songs");

// Importing validation functions for song data from validations/checkSongs.js
const {
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
} = require("../validations/checkSongs");

// INDEX route to retrieve all songs
songs.get("/", async (req, res) => {
  try {
    // Extracting 'order' and 'is_favorite' parameters from the request query
    const { order, is_favorite } = req.query;

    // Handle sorting if 'order' parameter is provided
    if (order === "asc") {
      // Sorting songs by name in ascending or descending order based on 'order' value
      const ascendingOrderSongs = await getAllSongsAscOrder();
      res.json({ songs: ascendingOrderSongs });
    } else if (order === "desc") {
      const descendingOrderSongs = await getAllSongsDescOrder();
      res.json({ songs: descendingOrderSongs });
    }

    // Filtering songs by 'is_favorite' if provided
    else if (is_favorite === "true" || is_favorite === "false") {
      // Converting string value to boolean
      const isFavorite = await getFilteredSongs(is_favorite);
      // Appending WHERE clause to filter songs by 'is_favorite' value
      res.json({ isFavorite: isFavorite });
    } else {
      // Fetching all songs from the database using the 'getAllSongs' function
      const allSongs = await getAllSongs();
      // Sending the fetched songs as a JSON response
      res.status(200).json(allSongs);
    }
  } catch (error) {
    // Handling server errors
    console.error(error);
    res.status(500).json({ error: "server error" });
  }
});

// Route to get ONE song by its ID
songs.get("/:id", async (req, res) => {
  // Extracting song ID from the request parameters
  const { id } = req.params;
  // Fetching the song with the specified ID using the 'getOneSong' function
  const song = await getOneSong(id);
  // Checking if the song exists
  if (song) {
    // Sending the fetched song as a JSON response
    res.json(song);
  } else {
    // Handling the case where the song is not found
    res.status(404).json({ error: "not found" });
  }
});

// Route to create a new song
songs.post(
  "/",
  // Validating song data before creation
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
  async (req, res) => {
    try {
      // Creating a new song using data from the request body
      const song = await createSong(req.body);
      // Sending the created song as a JSON response
      res.json(song);
    } catch (error) {
      // Handling validation errors
      res.status(400).json({ error });
    }
  }
);

// Route to update/edit an existing song by its ID
songs.put(
  "/:id",
  // Validating song data before updating
  checkNameAndArtist,
  checkBoolean,
  checkAlbum,
  checkTime,
  async (req, res) => {
    // Extracting song ID from the request parameters
    const { id } = req.params;
    if (id) {
      // Updating the song with the specified ID using data from the request body
      const updatedSong = await updateSong(id, req.body);
      // Sending the updated song as a JSON response
      res.status(200).json(updatedSong);
    } else {
      // Handling the case where the song ID is not provided
      res.status(400).json("Song not found");
    }
  }
);

// Route to delete a song by its ID
songs.delete("/:id", async (req, res) => {
  // Extracting song ID from the request parameters
  const { id } = req.params;
  // Deleting the song with the specified ID
  const deletedSong = await deleteSong(id);
  // Checking if the song was successfully deleted
  if (deletedSong.id) {
    // Sending a success message as a JSON response
    res.status(200).json({ message: "song was successfully deleted" });
  } else {
    // Handling the case where the song is not found
    res.status(404).json("Song not found");
  }
});

// Exporting the songs router to make it accessible in other files
module.exports = songs;
