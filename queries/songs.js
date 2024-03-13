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
        const song = await db.oneOrNone('SELECT * FROM songs WHERE id = $1;', [id]); // db.oneOrNone(), which retrieves at most one row from the database. If no row is found, it returns null instead of throwing an error like in db.one() - expects id to be an array even if it's just one parameter
        return song;
    } catch (error) {
        return error;
    }
};

// create fx
const addNewSong = async (song) => { // forgot to add id, but POST worked either way
    try {
        const newSong = await db.one(
            'INSERT INTO songs (name, artist, album, time, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *',
            [song.name, song.artist, song.album, song.time, song.is_favorite]
        )
        return newSong;
    } catch (error) {
        console.error('Error adding new song:', error);
        return error;
    }
};

// edit
const updateSong = async (id, song) => {
    try {
        const updatedSong = await db.one(
            "UPDATE songs SET name=$1, artist=$2, album=$3, time=$4, is_favorite=$5 WHERE id=$6 RETURNING *",
            [song.name, song.artist, song.album, song.time, song.is_favorite, id]
        );
        return updatedSong;
    } catch (error) {
        return error;
    }
};

const deleteSong = async (id) => {
    try {
        const deletedSong = await db.one(
            "DELETE FROM songs WHERE id = $1 RETURNING *", id
        );
        return deletedSong;
    } catch (error) {
        return error;
    }
};

module.exports = { 
    getAllSongs, 
    getSongById, 
    addNewSong, 
    updateSong, 
    deleteSong 
};