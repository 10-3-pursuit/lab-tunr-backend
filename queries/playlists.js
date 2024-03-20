const db = require('../db/dbConfig');

const getAllPlaylists = async () => { // params order / is_fave
    try {
        // conditionals for asc
        // sql
        const allPlaylists = await db.any('SELECT * FROM playlists;') // add order by asc (add column)
        console.log(allPlaylists);
        return allPlaylists;
    } catch (error) {
        return error
    }
};

const getPlaylist = async (id) => {
    try {
        const onePlaylist = await db.one("SELECT * FROM playlists WHERE id=$1", id);
        return onePlaylist;
    } catch (error) {
        return error;
    }
}

module.exports={
    getAllPlaylists,
    getPlaylist,
};