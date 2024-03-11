const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
        const allSongs = await db.any('SELECT * FROM bookmarks')
        return allSongs;
    } catch (error) {
        return error
    }
};

module.exports = { getAllSongs };