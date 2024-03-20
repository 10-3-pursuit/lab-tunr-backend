const db = require('../db/dbConfig.js')

const getAllSongs = async () => {
    try {
        const allSongs = await db.any('SELECT * FROM songs')
        return allSongs
    }   catch (error) {
        return error
    }
}

const getSong = async (id) => {
    try {
        const singleSong = await db.one('SELECT * FROM songs WHERE id=$[id]',{id: id});
        return singleSong
    } catch (error) {
        return error
    }
}

const inputSong = async (song) => {
   try {const newSong = await db.one('INSERT INTO songs (title, artist, album, time, is_favorite) values($1, $2, $3, $4, $5) RETURNING *', 
        [song.title, song.artist, song.album, song.time, song.is_favorite]
    )
        return newSong
    } catch (error) {
        return error
    }
}

const updateSong = async (id, song) => {
    try {
      const updatedSong = await db.one(
        "UPDATE songs SET title=$1, artist=$2, album=$3, time=$4, is_favorite=$5 where id=$6 RETURNING *",
        [ song.title, song.artist, song.album, song.time, song.is_favorite, id]
      );
      return updatedSong;
    } catch (error) {
      return error;
    }
  };

const deleteSong = async (id) => {
    try {
      const deletedSong = await db.one(
        "DELETE FROM songs WHERE id = $1 RETURNING *",
        id
      );
      return deletedSong;
    } catch (error) {
      return error;
    }
  };

module.exports = { getAllSongs, getSong, inputSong, deleteSong, updateSong }