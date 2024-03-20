const express = require('express');
const playlists = express.Router();

const { 
    getAllPlaylists,
    getPlaylist
 } = require("../queries/playlists");

playlists.get("/", async(_req, res) => {
    const allPlaylists = await getAllPlaylists();
    console.log(allPlaylists);

    if (allPlaylists[0]) res.status(200).json(allPlaylists);
    else res.status(500).json({error: "server error"});
});

playlists.get("/:id", async (req,res) => {
    const {id } = req.params;
    const playlist = await getPlaylist(id);
    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404).json({ eroor: "not found" });
    }
});

module.exports = playlists;