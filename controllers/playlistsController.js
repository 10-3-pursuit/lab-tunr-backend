const express = require("express");
// const { getSong } = require('../queries/bookmarks.js')
const playlists = express.Router();

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
    // const { bookmark_id } = req.params
    const allPlaylists = await getAllPlaylists()
    // const bookmark = await getBookmark(bookmark_id)
    if (allPlaylists[0]) {
      res.status(200).json(allPlaylists)
    // console.log("INDEX controller route", allPlaylists)
    } else {
      res.status(500).json({ error: 'server error' })
    }
  })

  // SHOW
playlists.get('/:id', async (req, res) => {
    const { id } = req.params
    const playlist = await getPlaylist(id)
    // const bookmark = await getBookmark(bookmark_id)
    if (playlist) {
      res.json(playlist)
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