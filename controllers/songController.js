const express = require("express");
const songs = express.Router();
const { getAllSongs, getSong, inputSong } = require('../queries/songs');

const { checkSongInputs, checkBoolean } = require('../validations/checkSongs');

songs.get('/', async (req, res) => {
    const allSongs = await getAllSongs()
    if(allSongs[0]) {
        res.status(200).json(allSongs)
    }else {
        res.status(500).json({ error: 'server error' })
    }
});

songs.get('/:id', async (req, res) =>{
    const { id } = req.params
    const Song = await getSong(id)
    if(Song){
        res.json(Song)
    } else {
        res.status(404).json({ error: 'not found' })
    }
    
})

songs.post('/', checkSongInputs, checkBoolean,  async (req, res) => {
   try {
    const song = await inputSong(req.body)
    res.json(song)
   } catch (error) {
        res.status(400).json({ error: error })
    }
})

module.exports = songs