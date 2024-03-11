const db = require('../db/dbConfig');

const getAllSongs = async () => {
    try {
        const allSongs = await db.any('SELECT * FROM songs;')
        return allSongs;
    } catch (error) {
        return error
    }
};

const getSongById = async (id) => {
    try {
        const song = await db.oneOrNone('SELECT * FROM songs WHERE id = $1;', [id]);
        return song;
    } catch (error) {
        return error;
    }
};

/*
- using the db.oneOrNone method instead of db.any. This method will return either one row (if a song with the specified ID is found) or null (if no song is found).
- using a parameterized query with a WHERE clause to filter by the song's ID (id = $1). The $1 placeholder will be replaced by the actual value of the id parameter passed to the function.
- passing the id as a parameter to the query function. This helps prevent SQL injection attacks and ensures the query is executed safely.
*/

module.exports = { getAllSongs, getSongById };