const express = require("express");
const playlists = express.Router();

const songsController = require("./songsController.js");

// Queries
const {
    getAllPlaylists,
    getPlaylist,
    createPlaylist,
    deletePlaylist,
    updatePlaylist,
  } = require("../queries/playlists");

playlists.use("/:playlist_id/songs", songsController)

  // INDEX
playlists.get('/', async (req, res) => {
    const allPlaylists  = await getAllPlaylists()
    if (allPlaylists[0]) res.status(200).json(allPlaylists)
    else res.status(500).json({ error: 'server error' })
})

  // SHOW
playlists.get('/:id', async (req, res) => {
    const { id } = req.params
    const playlist = await getPlaylist(id)
    if (playlist) res.json(playlist)
    else res.status(404).json({ error: 'playlist not found' })
})

// UPDATE
playlists.put('/:id', async (req, res) => {
    const { id } = req.params
    if (id){
        const updatedPlaylist = await updatePlaylist(id, req.body)
        res.status(200).json(updatedPlaylist)
    } else {
        res.status(404).json({error})
    }
}) 

// CREATE
playlists.post('/', async (req, res) => {
    try{
        const playlist = await createPlaylist(req.body)
        if(playlist.id) res.status(200).json(playlist)
    } catch (error) {   
        res.status(404).json('Playlist not created.')
    }
})

// DELETE
playlists.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedPlaylist = await deletePlaylist(id);
    if (deletedPlaylist.id) res.status(200).json(deletedPlaylist)
    else res.status(404).json({ error: "Playlist not found" })
});

module.exports = playlists