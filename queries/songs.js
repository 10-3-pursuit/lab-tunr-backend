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

module.exports = { getAllSongs, getSong }