const db = require('../db/dbConfig')

// INDEX
const getAllSongs = async (playlist_id) => {
    try {
        const songs = await db.any('SELECT * FROM songs WHERE playlist_id=$1', id)
        return songs
    } catch (error) {
        return error
    }
}

// SHOW
const getSong = async (id) => {
    try {
        const oneSong = await db.one('SELECT * FROM songs WHERE id=$1', id)
        return oneSong
    } catch(error) {
        return error
    }
}

// CREATE
const createSong = async ({ name, album, time, artist, is_favorite }) => {
    try {
        const newSong = await db.one(
            'INSERT INTO songs (name, album, time, artist, is_favorite) VALUES($1, $2, $3, $4, $5) RETURNING *', 
            [name, album, time, artist, is_favorite])
            return newSong
    } catch(error) {
        return error
    }
}

// UPDATE
const updateSong = async (id, song) => {
    const { name, album, time, artist, is_favorite } = song
    try{
        const updatedSong = await db.one(
            'UPDATE songs SET name=$1, album=$2, time=$3, artist=$4, is_favorite=$5 WHERE id=$6 RETURNING *',
            [name, album, time, artist, is_favorite, id]
        )
        return updatedSong
    } catch(error){
        return error
    }
}

// DELETE
const deleteSong = async(id) => {
    try {
        const deletedSong = await db.one(
            'DELETE FROM songs WHERE id=$1 RETURNING *', id
        )
        return deletedSong
    } catch(error){
        return error
    }
}

// BONUS
const orderByAsc = async () => {
    try {
        const sortedSongs = await db.any('SELECT * FROM songs ORDER BY name ASC')
        return sortedSongs
    } catch (error) {
        return error
    }    
}

const orderByDesc = async () => {
    try {
        const sortedSongs = await db.any('SELECT * FROM songs ORDER BY name DESC')
        return sortedSongs
    } catch (error) {
        return error
    } 
}

const getFavoriteSongs = async () => {
    try {
        const favoriteSongs = await db.any('SELECT * FROM songs WHERE is_favorite = true')
        return favoriteSongs
    } catch (error) {
        return error
    }
}

const getNotFavoriteSongs = async () => {
    try {
        const notFavoriteSongs = await db.any('SELECT * FROM songs WHERE is_favorite = false')
        return notFavoriteSongs
    } catch (error) {
        return error
    }
}

// PLAYLIST SONGS QUERIES
const getAllPlaylistSongs = async (id) => {
    try {
        const matchingSongs = await db.any('SELECT * FROM songs WHERE playlist_id=$1', id)
        return matchingSongs
    } catch (err) {
      return err
    }
}

const updateSongsPlaylistIdToNull = async (playlist_id) => {
    try {
        await db.none('UPDATE songs SET playlist_id = NULL WHERE playlist_id = $1', playlist_id);
        return true; // Return true to indicate successful update
    } catch (error) {
        return false; // Return false if update fails
    }
};

// const updatePlaylistSong = async (song_id) => {
//     try{
//         await db.none('UPDATE songs SET playlist_id = NULL WHERE id = $1', song_id)
//         return true
//     } catch (error) {
//         return false
//     }
// }


module.exports = { 
    getAllSongs, 
    getSong, 
    createSong, 
    deleteSong, 
    updateSong, 
    orderByAsc, 
    orderByDesc, 
    getFavoriteSongs, 
    getNotFavoriteSongs,
    getAllPlaylistSongs,
    updateSongsPlaylistIdToNull, 
    // updatePlaylistSong
}