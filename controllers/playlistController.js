const express = require("express");
const playlists = express.Router();

const {
    getAllPlaylists
} = require("../queries/playlists");

// Index
playlists.get("/", async (req, res) => {
    const allPlaylists = await getAllPlaylists();
    if (allPlaylists[0]) res.status(200).json(allPlaylists);
    else res.status(500).json({error:"server error"});
});