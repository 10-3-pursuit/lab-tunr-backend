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

module.exports={
    getAllPlaylists,
};