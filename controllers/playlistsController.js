const express = require("express");
const playlists = express.Router();
const { getAllPlaylistSongs, updateSongsPlaylistIdToNull } = require('../queries/songs.js')

// Queries
const {
    getAllPlaylists,
    getPlaylist,
    newPlaylist,
    deletePlaylist,
    updatePlaylist,
  } = require("../queries/playlists");

  // INDEX
playlists.get('/', async (req, res) => {
    const allPlaylistsWithSongs = []
    const allPlaylists  = await getAllPlaylists()

    for(let playlist of allPlaylists){
        const songs = await getAllPlaylistSongs(playlist.id)
        allPlaylistsWithSongs.push({ ...playlist, songs })
    }
    if (allPlaylistsWithSongs[0]) {
        res.status(200).json(allPlaylistsWithSongs)
    } else {
        res.status(500).json({ error: 'server error' })
    }
  })

  // SHOW
playlists.get('/:id', async (req, res) => {
    const { id } = req.params
    const playlist = await getPlaylist(id)
    const playlistSongs = await getAllPlaylistSongs(id)
    if (playlist) {
      res.json({ ...playlist, playlistSongs })
    } else {
      res.status(404).json({ error: 'playlist not found' })
    }
  })


// UPDATE
playlists.put('/:id', async (req, res) => {
    const { id } = req.params
    // console.log(id, req.params.bookmark_id)
    const updatedPlaylist = await updatePlaylist({id, ...req.body})
    if (updatedPlaylist.id) {
      res.status(200).json(updatedPlaylist)
    } else {
      res.status(404).json('Playlist not found')
    }
  }) 


// CREATE
playlists.post('/', async (req, res) => {
    // const { bookmark_id } = req.params
    const playlist = await newPlaylist(req.body)
    res.status(200).json(playlist)
  })


// DELETE
playlists.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedPlaylist = await deletePlaylist(id);
  if (deletedPlaylist.id) {
    //  update the playlist_id to NULL for songs associated with the deleted playlist.
    const updateSuccess = await updateSongsPlaylistIdToNull(id);
    if(updateSuccess){
        res.status(200).json(deletedPlaylist)
    } else {
        res.status(500).json({ error: "Failed to update songs' playlist_id" })
    }
  } else {
    res.status(404).json({ error: "Playlist not found" });
  }
});


  module.exports = playlists