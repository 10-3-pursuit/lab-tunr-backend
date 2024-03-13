const db = require("../db/dbConfig");

const getAllSongs = async (req, res) => {
  const { order, is_favorite } = req.query;
  try {
    if (order) {
      if (order === "asc") {
        const sortedSongsAsc = await db.any(
          "SELECT * FROM songs ORDER BY artist ASC"
        );
        return sortedSongsAsc;
      } else if (order === "desc") {
        const sortedSongsDesc = await db.any(
          "SELECT * FROM songs ORDER BY artist DESC"
        );
        return sortedSongsDesc;
      } else {
        return res.json({ message: "Invalid input." });
      }
    } else if (is_favorite !== undefined) {
      const areFavorites = await db.any(
        "SELECT * FROM songs WHERE is_favorite=$1",
        is_favorite
      );
      return areFavorites;
    } else {
      const allSongs = await db.any("SELECT * FROM songs");
      return allSongs;
    }
  } catch (error) {
    return error;
  }
};

const getSong = async (id) => {
  try {
    const oneSong = await db.one("SELECT * FROM songs WHERE id=$1", id);
    return oneSong;
  } catch (error) {
    return error;
  }
};

const createSong = async ({
  name,
  artist,
  genre,
  song_duration,
  is_favorite,
}) => {
  try {
    const newSong = await db.one(
      "INSERT INTO songs (name, artist, genre, song_duration, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, artist, genre, song_duration, is_favorite]
    );
    return newSong;
  } catch (error) {
    return error;
  }
};

const updateSong = async (id, song) => {
  const { name, artist, genre, song_duration, is_favorite } = song;
  try {
    const updatedSong = await db.one(
      "UPDATE songs SET name=$1, artist=$2, genre=$3, song_duration=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
      [name, artist, genre, song_duration, is_favorite, id]
    );
    return updatedSong;
  } catch (error) {
    return error;
  }
};

const deleteSong = async (id) => {
  try {
    const deletedSong = await db.one(
      "DELETE FROM songs WHERE id=$1 RETURNING *",
      id
    );
    return deletedSong;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  updateSong,
  deleteSong,
};
