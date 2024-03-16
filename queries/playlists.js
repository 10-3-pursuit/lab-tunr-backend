const { all } = require("../app.js");
const db = require("../db/dbConfig.js");

// INDEX
const getAllPlaylists = async () => {
    try {
      const allPlaylists = await db.any(
        'SELECT * FROM playlists'
      )
      // console.log("index query", allPlaylists)
      return allPlaylists
    } catch (err) {
      return err
    }
}

// SHOW
const getPlaylist = async (id) => {
    try {
      const onePlaylist = await db.one('SELECT * FROM playlists WHERE id=$1', id)
      return onePlaylist
    } catch (error) {
      return error
    }
  }

// UPDATE
const updatePlaylist = async (playlist) => {
  try {
    const updatedPlaylist = await db.one(
      "UPDATE playlists SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [playlist.name, playlist.description, playlist.id ]
    );
    return updatedPlaylist;
  } catch (error) {
    return error;
  }
};

// CREATE
const newPlaylist = async (playlist) => {
  try {
    const newPlaylist = await db.one(
      "INSERT INTO playlists (name, description) VALUES($1, $2) RETURNING *",
      [playlist.name, playlist.description ]
    );
    return newPlaylist;
  } catch (error) {
    return error;
  }
};

// DELETE
const deletePlaylist= async (id) => {
  try {
    const deletedPlaylist = await db.one(
      "DELETE FROM playlists WHERE id = $1 RETURNING *",
      id
    );
    return deletedPlaylist;
  } catch (error) {
    return error;
  }
};

  

module.exports = {
    getAllPlaylists, 
    getPlaylist, 
    updatePlaylist, 
    newPlaylist, 
    deletePlaylist
};