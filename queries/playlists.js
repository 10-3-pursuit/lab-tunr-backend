const db = require("../db/dbConfigure.js");

const getAllPlaylists = async (playlist_id) => {
  try {
    const allPlaylists = await db.one(
      "SELECT * FROM playlists WHERE  playlist_id=$1",
      playlist_id
    );
    return allPlaylists;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllPlaylists,
};
