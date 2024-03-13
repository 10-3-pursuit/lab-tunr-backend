const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, createSong, deleteSong } = require('../queries/songs')
const {checkNameArtist, checkBoolean} = require('../validations/checkSongs.js')

// INDEX
songs.get('/', async (req, res) => {
    const allSongs = await getAllSongs()
    if (allSongs[0]) res.status(200).json(allSongs)
    else res.status(500).json({ error: "server error" })
})

// SHOW
songs.get('/:id', async (req, res) => {
    const {id} = req.params
    const song = await getSong(id)
    if(song){
        res.json(song)
    } else {
        res.status(404).json({error: 'Song Not Found'})
    }
})

// CREATE
songs.post('/', checkNameArtist, checkBoolean, async (req, res) => {
    try {
        const song = await createSong(req.body)
        res.json(song)
    } catch (error) {
        res.status(400).json({ error: 'Song creation failed.'})
    }
})

// DELETE
songs.delete('/:id', async (req, res) => {
    const {id} = req.params
    const deletedSong = await deleteSong(id)
    if(deletedSong.id){
        res.status(200).json(deletedSong)
    } else {
        res.status(404).json('Song not found.')
    }
})


module.exports = songs;