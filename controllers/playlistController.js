const express = require('express');
const playlists = express.Router();

const { 
    getAllPlaylists,
    getPlaylist,
    updatePlaylist,
    createPlaylist,
    deletePlaylist
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
        res.status(404).json({ error: "not found" });
    }
});

playlists.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, category, description, song_id } = req.body;

    try {
        const updatedPlaylist = await updatePlaylist({ id, name, category, description, song_id });
        res.status(200).json(updatedPlaylist);
    } catch (error) {
        res.status(500).json({ error: "Failed to update playlist" });
    }
});

playlists.post("/", async(req, res) => {
    try {
        const playlist = await createPlaylist(req.body);
        res.json(playlist);
    } catch (error) {
        res.status(400).json({ error });
    }
});

playlists.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    if(deletedPlaylist.id) {
        res.status(200).json(deletedPlaylist);
    } else {
        res.status(404).json("Playlist not found");
    }
});

module.exports = playlists;