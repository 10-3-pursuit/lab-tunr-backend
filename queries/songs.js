// queries/bookmarks.js
const db = require("../db/dbConfigure.js");

// to get all songs
const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
  } catch (error) {
    return error;
  }
};

// to get all songs in ascending order
const getAllSongsAscOrder = async () => {
  try {
    const allSongsAscOrder = await db.any(
      "SELECT * FROM songs ORDER BY name ASC"
    );
    return allSongsAscOrder;
  } catch (error) {
    return error;
  }
};

// to get all songs in descending order
const getAllSongsDescOrder = async () => {
  try {
    const allSongsDescOrder = await db.any(
      "SELECT * FROM songs ORDER BY name DESC"
    );
    return allSongsDescOrder;
  } catch (error) {
    return error;
  }
};

// to get filtered songs based on is_favorite
const getFavoriteSongs = async (is_Favorite) => {
  try {
    const favoriteSongs = await db.any(
      "SELECT * FROM songs WHERE is_favorite = true",
      is_Favorite
    );
    return favoriteSongs;
  } catch (error) {
    return error;
  }
};
// to get filtered songs based on is_favorite
const getNonFavoriteSongs = async (is_Favorite) => {
  try {
    const nonFavoriteSongs = await db.any(
      "SELECT * FROM songs WHERE is_favorite = false",
      is_Favorite
    );
    return nonFavoriteSongs;
  } catch (error) {
    return error;
  }
};

// to get ONE song
const getOneSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

// to create a song AKA a POST request
const createSong = async (song) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [song.name, song.artist, song.album, song.time, song.is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

// UPDATE/EDIT song
const updateSong = async (id, song) => {
  const { name, artist, album, time, is_favorite } = song;
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [name, artist, album, time, is_favorite, id]
    );
    return updatedSong;
  } catch (error) {
    return "Song not found";
  }
};

// DELETE  a song
const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id = $1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return "song not found";
  }
};

module.exports = {
  getAllSongs,
  getOneSong,
  createSong,
  updateSong,
  deleteSong,
  getAllSongsAscOrder,
  getAllSongsDescOrder,
  getFavoriteSongs,
  getNonFavoriteSongs,
};
