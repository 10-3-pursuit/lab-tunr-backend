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
   try {const newSong = await db.one('INSERT INTO songs (name, artist, album, time, is_favorite) values($1, $2, $3, $4, $5) RETURNING *', 
        [song.name, song.artist, song.album, song.time, song.is_favorite]
    )
        return newSong
    } catch (error) {
        return error
    }
}

module.exports = { getAllSongs, getSong, inputSong }