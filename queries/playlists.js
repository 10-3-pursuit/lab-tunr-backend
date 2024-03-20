const db = require("../db/dbConfig");

const getAllPlaylists = async () => {
  try {
    const allPlaylists = await db.any("SELECT * FROM playlists");
    return allPlaylists;
  } catch (error) {
    return error;
  }
};

const getPlaylist = async (id) => {
  try {
    const onePlaylist = await db.one("SELECT * FROM playlists WHERE id=$1", id);
    return onePlaylist;
  } catch (error) {
    return error;
  }
};

const createPlaylist = async ({ name, description }) => {
  try {
    const newPlaylist = await db.one(
      "INSERT INTO playlists (name, description) VALUES($1, $2) RETURNING *",
      [name, description]
    );
    return newPlaylist;
  } catch (error) {
    return error;
  }
};

const updatePlaylist = async (playlist) => {
  const { name, description, id } = playlist;
  try {
    const updatedPlaylist = await db.one(
      "UPDATE playlists SET name=$1, description=$2 WHERE id=$3 RETURNING *",
      [name, description, id]
    );
    return updatedPlaylist;
  } catch (error) {
    return error;
  }
};

const deletePlaylist = async (id) => {
  try {
    const deletedPlaylist = await db.one(
      "DELETE FROM playlists WHERE id=$1 RETURNING *",
      id
    );
    return deletedPlaylist;
  } catch (error) {
    return error;
  }
};

// const setPlaylist_IdToNull = (id) => {

// }

module.exports = {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
};
