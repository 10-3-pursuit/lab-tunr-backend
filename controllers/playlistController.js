const express = require('express');
const playlists = express.Router();
const { getAllPlaylists } = require("../queries/playlists");

playlists.get("/", async(_req, res) => {
    const allPlaylists = await getAllPlaylists();
    console.log(allPlaylists);

    if (allPlaylists[0]) res.status(200).json(allPlaylists);
    else res.status(500).json({error: "server error"});
});

module.exports = playlists;