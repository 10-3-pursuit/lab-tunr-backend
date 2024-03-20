const db = require("../db/dbConfig.js");

const getAllPlaylists = async () => {
    try {
      const allPlaylists = await db.any("SELECT * FROM playlists");
      return allPlaylists;
    } catch (error) {
      return error;
    }
  };
  