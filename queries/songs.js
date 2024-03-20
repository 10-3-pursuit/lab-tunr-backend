// Importing the database configuration file
const db = require("../db/dbConfigure.js");

// Function to retrieve all songs from the database
const getAllSongs = async () => {
  try {
    // Querying the database to get all songs
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs; // Returning all the songs retrieved from the database
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to retrieve filtered songs based on whether they are marked as favorites or not
const getFilteredSongs = async (isFavorite) => {
  try {
    // Querying the database to get songs filtered by the is_favorite column
    const filteredSongs = await db.any(
      "SELECT * FROM songs WHERE is_favorite = $1",
      isFavorite
    );
    return filteredSongs; // Returning the filtered songs
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to retrieve all songs in ascending order of their names
const getAllSongsAscOrder = async () => {
  try {
    // Querying the database to get all songs ordered by name in ascending order
    const allSongsAscOrder = await db.any(
      "SELECT * FROM songs ORDER BY name ASC"
    );

    return allSongsAscOrder; // Returning the songs ordered in ascending order
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to retrieve all songs in descending order of their names
const getAllSongsDescOrder = async () => {
  try {
    // Querying the database to get all songs ordered by name in descending order
    const allSongsDescOrder = await db.any(
      "SELECT * FROM songs ORDER BY name DESC"
    );
    return allSongsDescOrder; // Returning the songs ordered in descending order
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to retrieve a single song based on its ID
const getOneSong = async (id) => {
  try {
    // Querying the database to get a single song based on its ID
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong; // Returning the retrieved song
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to create a new song in the database
const createSong = async (song) => {
  try {
    // Inserting a new song record into the database
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong; // Returning the newly created song
  } catch (error) {
    return error; // Returning any error encountered during the process
  }
};

// Function to update an existing song in the database
const updateSong = async (id, song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    // Updating an existing song record in the database based on its ID
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [name, artist, album, time, is_favorite, id]
    );
    return updatedSong; // Returning the updated song
  } catch (error) {
    throw new Error("Song not found"); // Throwing an error if the song is not found
  }
};

// Function to delete an existing song from the database
const deleteSong = async (id) => {
  try {
    // Deleting an existing song record from the database based on its ID
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong; // Returning the deleted song
  } catch (error) {
    throw new Error("Song not found"); // Throwing an error if the song is not found
  }
};

// Exporting all the functions to be used by other modules
module.exports = {
  getAllSongs,
  getOneSong,
  createSong,
  updateSong,
  deleteSong,
  getAllSongsAscOrder,
  getAllSongsDescOrder,
  getFilteredSongs,
};
