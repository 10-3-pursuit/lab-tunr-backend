const express = require("express");
// const { getSong } = require('../queries/bookmarks.js')
const playlists = express.Router();
const { getAllPlaylistSongs } = require('../queries/songs.js')

const songsController = require('./songsController')

// Queries
const {
    getAllPlaylists,
    getPlaylist,
    newPlaylist,
    deletePlaylist,
    updatePlaylist,
  } = require("../queries/playlists");

//   playlists.use('/:playlist_id/songs', songsController)

  // INDEX
playlists.get('/', async (req, res) => {
    // const { playlist_id } = req.params
    // const  playlistSongs = await getAllPlaylistSongs(playlist_id)
    // const playlist = await getPlaylist(playlist_id)
    const allPlaylists  = await getAllPlaylists()
    if (allPlaylists[0]) {
    //   res.status(200).json([{ ...playlist, playlistSongs}])
    res.status(200).json(allPlaylists)
    // console.log("INDEX controller route", playlist)
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
    const updatedPlaylist = await updatePlaylist(id, req.body)
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
    res.status(200).json(deletedPlaylist);
  } else {
    res.status(404).json({ error: "Playlist not found" });
  }
});


  module.exports = playlists