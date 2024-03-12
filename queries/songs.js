const db = require("../db/dbConfig");

const getAllSongs = async () => {
  try {
    const allSongs = await db.any("SELECT * FROM songs");
    return allSongs;
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

module.exports = { getAllSongs, getSong, createSong };
