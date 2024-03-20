const express = require('express');
const playlists = express.Router({ mergeParams: true });

const { getSongById } = require("../queries/songs.js");

const { 
    getAllPlaylists,
    getPlaylist,
    updatePlaylist,
    createPlaylist,
    deletePlaylist
 } = require("../queries/playlists");

playlists.get("/", async(req, res) => {
    const { song_id } = req.params;
    const allPlaylists = await getAllPlaylists(song_id);
    const song = await getSongById(song_id);
    // console.log(song.id)
    if (song.id) res.status(200).json({ ...song, allPlaylists });
    else res.status(500).json({error: "Song not found or server error"});
});


playlists.get("/:id", async (req,res) => {
try {
    const { song_id, id } = req.params;
    const [playlist, song] = await Promise.all([getPlaylist(id), getSongById(song_id)]);

        if (playlist) {
            res.json({ ...song, playlist });
        } else {
            res.status(404).json({ error: "Playlist not found" });
        }
    } catch(error) {
    res.status(500).json({ error: 'Internal server error' });
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